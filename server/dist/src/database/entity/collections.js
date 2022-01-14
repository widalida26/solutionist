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
const sets_1 = require("./sets");
const users_1 = require("./users");
let collections = class collections {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], collections.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], collections.prototype, "creatorId", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", typeorm_1.Timestamp)
], collections.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_1.users, (user) => user.id),
    __metadata("design:type", users_1.users)
], collections.prototype, "creator", void 0);
__decorate([
    typeorm_1.OneToMany(() => sets_1.sets, (set) => set.collection, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], collections.prototype, "set", void 0);
collections = __decorate([
    typeorm_1.Entity()
], collections);
exports.collections = collections;
//# sourceMappingURL=collections.js.map