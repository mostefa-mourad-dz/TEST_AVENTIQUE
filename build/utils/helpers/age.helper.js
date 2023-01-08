"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.birthDayCalculator = exports.ageCalculator = void 0;
var YEAR_IN_MILLISECONDS = 365 * 24 * 60 * 60 * 1000;
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
    var ageInMillis = age * YEAR_IN_MILLISECONDS;
    // I substracted 6 months in addition on the assmption that the user has reached his birthday at least 6 monthss ago
    return new Date(new Date().getTime() - ageInMillis - YEAR_IN_MILLISECONDS / 2)
        .toISOString()
        .split('T')[0];
};
exports.birthDayCalculator = birthDayCalculator;
