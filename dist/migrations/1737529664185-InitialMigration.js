"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1737529664185 = void 0;
class InitialMigration1737529664185 {
    constructor() {
        this.name = 'InitialMigration1737529664185';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "url_analytics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "urlId" uuid NOT NULL, "visitedAt" TIMESTAMP NOT NULL DEFAULT now(), "browser" character varying, "device" character varying, "location" character varying, CONSTRAINT "PK_25b9ce28f474dc664e525a5fa21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "urls" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "originalUrl" character varying NOT NULL, "shortHash" character varying NOT NULL, "expirationDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "visitCount" integer NOT NULL DEFAULT '0', "userId" uuid NOT NULL, CONSTRAINT "UQ_aacdba4c65e535a14ccf5db3065" UNIQUE ("originalUrl"), CONSTRAINT "UQ_c783892a4c813230a6b540d2464" UNIQUE ("shortHash"), CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "url_analytics" ADD CONSTRAINT "FK_2a6fb370b52fc3284ff6fa28f7f" FOREIGN KEY ("urlId") REFERENCES "urls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "urls" ADD CONSTRAINT "FK_3088b58113241e3f5f6c10cf1fb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "FK_3088b58113241e3f5f6c10cf1fb"`);
        await queryRunner.query(`ALTER TABLE "url_analytics" DROP CONSTRAINT "FK_2a6fb370b52fc3284ff6fa28f7f"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "urls"`);
        await queryRunner.query(`DROP TABLE "url_analytics"`);
    }
}
exports.InitialMigration1737529664185 = InitialMigration1737529664185;
//# sourceMappingURL=1737529664185-InitialMigration.js.map