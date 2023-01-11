"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
var app_1 = __importDefault(require("./app"));
var user_controller_1 = __importDefault(require("./resources/User/user.controller"));
var app = new app_1.default([new user_controller_1.default()], Number(3000));
app.listen();
