export function isNumber(value) {
    return new RegExp('^[0-9]*$').test(value);
}

export function isTextAndBlankSpaces(value) {
    return new RegExp('^[a-zA-Z ]*$').test(value);
}
