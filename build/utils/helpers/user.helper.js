"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUsers = void 0;
var age_helper_1 = require("./age.helper");
var formatUsers = function (users) {
    return users.map(function (user) {
        return {
            fullName: user.first_name + ' ' + user.last_name,
            email: user.email,
            age: (0, age_helper_1.ageCalculator)(user.birthday),
        };
    });
};
exports.formatUsers = formatUsers;
