"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterStopwords = void 0;
const list = [
    'a',
    'about',
    'an',
    'a',
    'as',
    'at',
    'be',
    'by',
    'com',
    'for',
    'from',
    'how',
    'in',
    'is',
    'it',
    'of',
    'on',
    'or',
    'that',
    'the',
    'this',
    'to',
    'was',
    'what',
    'when',
    'where',
    'who',
    'will',
    'with',
    'the',
    'www',
];
exports.filterStopwords = (keyword) => {
    const words = keyword.trim().split(' ');
    for (let i = 0; i < words.length; i++) {
        const element = words[i];
        if (list.indexOf(element) !== -1) {
            words.splice(i, 1);
            i--;
        }
    }
    return words.join(' ').trim();
};
