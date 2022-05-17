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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var upload_1 = __importDefault(require("../../../../../config/upload"));
var Clients = /** @class */ (function () {
    function Clients() {
    }
    Clients.prototype.getAvatarUrl = function () {
        if (!this.avatar) {
            return null;
        }
        switch (upload_1.default.driver) {
            case 'disk':
                return "".concat(process.env.APP_API_URL, "/files/").concat(this.avatar);
            case 's3':
                return "https://".concat(upload_1.default.config.aws.bucket, ".s3.amazonaws.com/").concat(this.avatar);
            default:
                return null;
        }
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Clients.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Clients.prototype, "nome", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Clients.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Clients.prototype, "telefone", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Clients.prototype, "cpf", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_transformer_1.Exclude)(),
        __metadata("design:type", String)
    ], Clients.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Clients.prototype, "avatar", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Clients.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Clients.prototype, "update_at", void 0);
    __decorate([
        (0, class_transformer_1.Expose)({ name: 'avatar_url' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], Clients.prototype, "getAvatarUrl", null);
    Clients = __decorate([
        (0, typeorm_1.Entity)('clients')
    ], Clients);
    return Clients;
}());
exports.default = Clients;
