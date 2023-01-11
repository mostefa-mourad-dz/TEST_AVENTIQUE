"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var age_helper_1 = require("../../utils/helpers/age.helper");
var files_helper_1 = require("../../utils/helpers/files.helper");
var UserService = /** @class */ (function () {
    function UserService() {
        this.db_name = 'users';
        this.link = '';
    }
    // get all users
    UserService.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, files_helper_1.readAllObjects)(this.db_name)];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get user by id
    UserService.prototype.getUserById = function (Id) {
        return __awaiter(this, void 0, void 0, function () {
            var users, user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, files_helper_1.readAllObjects)(this.db_name)];
                    case 1:
                        users = _a.sent();
                        user = users.find(function (user) { return user.id === Id; });
                        // If user does not exist
                        if (!user) {
                            throw new Error('User not found');
                        }
                        // else if user exists
                        return [2 /*return*/, user];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // store user
    UserService.prototype.store = function (email, password, first_name, last_name, age) {
        return __awaiter(this, void 0, void 0, function () {
            var users, user, hash, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, (0, files_helper_1.readAllObjects)(this.db_name)];
                    case 1:
                        users = _a.sent();
                        user = users.find(function (user) { return user.email === email; });
                        if (!user) return [3 /*break*/, 2];
                        // If email address aleady taken
                        throw new Error('User already exists');
                    case 2: return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 3:
                        hash = _a.sent();
                        users.push({
                            id: users.length + 1,
                            email: email,
                            first_name: first_name,
                            last_name: last_name,
                            birthday: (0, age_helper_1.birthDayCalculator)(age),
                            password: hash,
                        });
                        return [4 /*yield*/, (0, files_helper_1.writeAllObjects)(this.db_name, users)];
                    case 4:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, 'User created successfuly'];
                        }
                        // In case something went wrong during the writing process
                        throw new Error('Something went wrong');
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        throw new Error(error_3.message);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // update user by Id
    UserService.prototype.update = function (id, email, password, first_name, last_name, age) {
        return __awaiter(this, void 0, void 0, function () {
            var users, user, email_check, hash, index, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, (0, files_helper_1.readAllObjects)(this.db_name)];
                    case 1:
                        users = _a.sent();
                        user = users.find(function (user) { return user.id === id; });
                        email_check = users.find(function (user) { return user.email === email; });
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 2:
                        hash = _a.sent();
                        if (!user) return [3 /*break*/, 6];
                        if (!(user.email === email || !email_check)) return [3 /*break*/, 4];
                        index = users.findIndex(function (user) { return user.id === id; });
                        users[index] = {
                            id: id,
                            email: email,
                            password: hash,
                            first_name: first_name,
                            last_name: last_name,
                            birthday: (0, age_helper_1.birthDayCalculator)(age),
                        };
                        return [4 /*yield*/, (0, files_helper_1.writeAllObjects)(this.db_name, users)];
                    case 3:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, 'User created successfuly'];
                        }
                        // In case something went wrong during the writing process
                        throw new Error('Something went wrong');
                    case 4: 
                    // if new email address taken by another user
                    throw new Error('Email must be unique');
                    case 5: return [3 /*break*/, 7];
                    case 6: throw new Error('User not found');
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_4 = _a.sent();
                        throw new Error(error_4.message);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    // delete user by id
    UserService.prototype.deleteUserById = function (Id) {
        return __awaiter(this, void 0, void 0, function () {
            var users, user, index, new_users, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, files_helper_1.readAllObjects)(this.db_name)];
                    case 1:
                        users = _a.sent();
                        user = users.find(function (user) { return user.id === Id; });
                        if (!user) {
                            // If User does not exist
                            throw new Error('User not found');
                        }
                        index = users.findIndex(function (user) { return user.id === Id; });
                        new_users = users.splice(index, 1);
                        return [4 /*yield*/, (0, files_helper_1.writeAllObjects)(this.db_name, new_users)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, 'User deleted successfully'];
                        }
                        // In case something went wrong during the writing process
                        throw new Error('Something went wrong');
                    case 3:
                        error_5 = _a.sent();
                        throw new Error(error_5.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.default = UserService;
