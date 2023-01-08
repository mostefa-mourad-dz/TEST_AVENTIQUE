"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.birthDayCalculator = exports.ageCalculator = void 0;
var ageCalculator = function (bday) {
    var today = new Date();
    var birthDate = new Date(bday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
exports.ageCalculator = ageCalculator;
var birthDayCalculator = function (age) {
    return '1999-07-13';
};
exports.birthDayCalculator = birthDayCalculator;
