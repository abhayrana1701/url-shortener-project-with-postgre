// src/entities/Url.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user";
import { UrlAnalytics } from "./urlanalytics";

@Entity("urls")
export class Url {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true })
    originalUrl!: string;

    @Column({ unique: true })
    shortHash!: string;

    @Column({ type: 'timestamp', nullable: true })
    expirationDate!: Date | null;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ default: 0 })
    visitCount!: number;

    @Column()
    userId!: string;

    @ManyToOne(() => User, user => user.urls)
    user!: User;

    @OneToMany(() => UrlAnalytics, analytics => analytics.url)
    analytics!: UrlAnalytics[];
}
