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
const problems_1 = require("./problems");
let usersProblems = class usersProblems {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], usersProblems.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], usersProblems.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], usersProblems.prototype, "setId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], usersProblems.prototype, "problemId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], usersProblems.prototype, "chocie", void 0);
__decorate([
    typeorm_1.ManyToOne(() => sets_1.sets, (set) => set.id),
    __metadata("design:type", sets_1.sets)
], usersProblems.prototype, "set", void 0);
__decorate([
    typeorm_1.ManyToOne(() => problems_1.problems, (problem) => problem.id),
    __metadata("design:type", problems_1.problems)
], usersProblems.prototype, "problem", void 0);
usersProblems = __decorate([
    typeorm_1.Entity()
], usersProblems);
exports.usersProblems = usersProblems;
//# sourceMappingURL=usersProblems.js.map