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
const sets_1 = require("./sets");
const solveRecords_1 = require("./solveRecords");
let users = class users {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], users.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], users.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({
        unique: true,
    }),
    __metadata("design:type", String)
], users.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], users.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], users.prototype, "salt", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], users.prototype, "profileImage", void 0);
__decorate([
    typeorm_1.Column({ default: 'user' }),
    __metadata("design:type", String)
], users.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ default: 'normal' }),
    __metadata("design:type", String)
], users.prototype, "type", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", typeorm_1.Timestamp)
], users.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => collections_1.collections, (collection) => collection.creator),
    __metadata("design:type", Array)
], users.prototype, "collection", void 0);
__decorate([
    typeorm_1.OneToMany(() => sets_1.sets, (set) => set.editor),
    __metadata("design:type", Array)
], users.prototype, "set", void 0);
__decorate([
    typeorm_1.OneToMany(() => solveRecords_1.solveRecords, (record) => record.user),
    __metadata("design:type", Array)
], users.prototype, "solved", void 0);
users = __decorate([
    typeorm_1.Entity()
], users);
exports.users = users;
//# sourceMappingURL=users.js.map