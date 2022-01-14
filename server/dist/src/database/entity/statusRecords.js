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
const solveRecords_1 = require("./solveRecords");
const solveStatus_1 = require("./solveStatus");
let statusRecords = class statusRecords {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], statusRecords.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], statusRecords.prototype, "recordId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], statusRecords.prototype, "statusId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], statusRecords.prototype, "setId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], statusRecords.prototype, "rate", void 0);
__decorate([
    typeorm_1.ManyToOne(() => solveRecords_1.solveRecords, (record) => record.id, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", solveRecords_1.solveRecords)
], statusRecords.prototype, "record", void 0);
__decorate([
    typeorm_1.ManyToOne(() => solveStatus_1.solveStatus, (status) => status.id, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", solveStatus_1.solveStatus)
], statusRecords.prototype, "status", void 0);
statusRecords = __decorate([
    typeorm_1.Entity()
], statusRecords);
exports.statusRecords = statusRecords;
//# sourceMappingURL=statusRecords.js.map