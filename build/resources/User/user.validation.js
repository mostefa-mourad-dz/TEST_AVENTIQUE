"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var createUser = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    age: joi_1.default.number().required(),
});
exports.default = { createUser: createUser };
