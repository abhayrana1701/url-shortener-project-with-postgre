"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlAnalytics = void 0;
// src/entities/UrlAnalytics.entity.ts
const typeorm_1 = require("typeorm");
const url_1 = require("./url");
let UrlAnalytics = class UrlAnalytics {
};
exports.UrlAnalytics = UrlAnalytics;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], UrlAnalytics.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UrlAnalytics.prototype, "urlId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UrlAnalytics.prototype, "visitedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UrlAnalytics.prototype, "browser", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UrlAnalytics.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UrlAnalytics.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => url_1.Url, url => url.analytics),
    __metadata("design:type", url_1.Url)
], UrlAnalytics.prototype, "url", void 0);
exports.UrlAnalytics = UrlAnalytics = __decorate([
    (0, typeorm_1.Entity)("url_analytics")
], UrlAnalytics);
//# sourceMappingURL=urlanalytics.js.map