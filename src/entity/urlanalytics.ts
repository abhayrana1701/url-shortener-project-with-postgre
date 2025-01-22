
// src/entities/UrlAnalytics.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Url } from "./url";

@Entity("url_analytics")
export class UrlAnalytics {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    urlId!: string;

    @CreateDateColumn()
    visitedAt!: Date;

    @Column({ nullable: true })
    browser!: string;

    @Column({ nullable: true })
    device!: string;

    @Column({ nullable: true })
    location!: string;

    @ManyToOne(() => Url, url => url.analytics)
    url!: Url;
}