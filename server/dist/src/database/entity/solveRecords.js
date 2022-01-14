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
const solveStatus_1 = require("./solveStatus");
const statusRecords_1 = require("./statusRecords");
let solveRecords = class solveRecords {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], solveRecords.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], solveRecords.prototype, "setId", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", Number)
], solveRecords.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({
        default: -1,
    }),
    __metadata("design:type", Number)
], solveRecords.prototype, "answerRate", void 0);
__decorate([
    typeorm_1.ManyToOne(() => sets_1.sets, (set) => set.id, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", sets_1.sets)
], solveRecords.prototype, "set", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_1.users, (user) => user.id),
    __metadata("design:type", users_1.users)
], solveRecords.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => solveStatus_1.solveStatus, (status) => status.record, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], solveRecords.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany(() => statusRecords_1.statusRecords, (rate) => rate.record, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], solveRecords.prototype, "sRec", void 0);
solveRecords = __decorate([
    typeorm_1.Entity()
], solveRecords);
exports.solveRecords = solveRecords;
//# sourceMappingURL=solveRecords.js.map