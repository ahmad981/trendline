"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersection = exports.uniion = void 0;
exports.uniion = (arr1, arr2) => {
    const newarr = [];
    arr1.forEach(itm => newarr.push(itm));
    arr2.forEach(itm => {
        if (newarr.indexOf(itm) === -1) {
            newarr.push(itm);
        }
    });
    return newarr;
};
exports.intersection = (arr1, arr2) => {
    const newarr = [];
    arr1.forEach(itm => {
        if (arr2.indexOf(itm) !== -1) {
            newarr.push(itm);
        }
    });
    return newarr;
};
