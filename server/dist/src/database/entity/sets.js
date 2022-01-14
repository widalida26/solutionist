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
const typeorm_1 = require("typeorm");
const collections_1 = require("./collections");
const users_1 = require("./users");
const problems_1 = require("./problems");
let sets = class sets {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], sets.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], sets.prototype, "collectionId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], sets.prototype, "editorId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], sets.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], sets.prototype, "description", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", typeorm_1.Timestamp)
], sets.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => collections_1.collections, (collection) => collection.id, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", collections_1.collections)
], sets.prototype, "collection", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_1.users, (user) => user.id),
    __metadata("design:type", users_1.users)
], sets.prototype, "editor", void 0);
__decorate([
    typeorm_1.OneToMany(() => problems_1.problems, (problem) => problem.set, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], sets.prototype, "problem", void 0);
sets = __decorate([
    typeorm_1.Entity()
], sets);
exports.sets = sets;
//# sourceMappingURL=sets.js.map