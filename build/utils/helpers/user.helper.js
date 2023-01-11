"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSingleUser = exports.formatUsers = void 0;
var age_helper_1 = require("./age.helper");
var formatUsers = function (users) {
    return users.map(function (user) { return (0, exports.formatSingleUser)(user); });
};
exports.formatUsers = formatUsers;
var formatSingleUser = function (user) {
    return {
        id: user.id,
        full_name: user.first_name + ' ' + user.last_name,
        email: user.email,
        age: (0, age_helper_1.ageCalculator)(user.birthday),
    };
};
exports.formatSingleUser = formatSingleUser;
