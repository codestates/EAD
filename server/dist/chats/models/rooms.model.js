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
exports.RoomSchema = exports.Room = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const chattings_model_1 = require("./chattings.model");
const options = {
    timestamps: true,
};
let Room = class Room extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Room.prototype, "roomName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            _id: { type: mongoose_2.Types.ObjectId, required: true, ref: 'Chatting' },
            user: { type: String, required: true },
            content: { type: String },
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", chattings_model_1.Chatting)
], Room.prototype, "chat", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Room.prototype, "users", void 0);
Room = __decorate([
    (0, mongoose_1.Schema)(options)
], Room);
exports.Room = Room;
const RoomSchema = mongoose_1.SchemaFactory.createForClass(Room);
exports.RoomSchema = RoomSchema;
//# sourceMappingURL=rooms.model.js.map