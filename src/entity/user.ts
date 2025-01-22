import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { Url } from "./url";
import bcrypt from "bcrypt";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    refreshToken!: string;

    @OneToMany(() => Url, url => url.user)
    urls!: Url[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        // Only hash the password if it's been modified
        if (this.password && this.password.length < 60) { // bcrypt hashes are 60 chars
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}
