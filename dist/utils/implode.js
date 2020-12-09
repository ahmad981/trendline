"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implode = void 0;
/**
 *
 * @param arr
 * @param field
 * @description {it check for two types}
 */
exports.implode = (arr, field) => {
    const test = [];
    if (field) {
        for (let i = 0; i < arr.length; i++) {
            test.push(`${arr[i][field]}`);
        }
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            test.push(`'${arr[i]}'`);
        }
    }
    return test;
};
