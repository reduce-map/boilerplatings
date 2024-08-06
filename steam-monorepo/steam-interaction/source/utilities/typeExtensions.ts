export function isFloat(targetValue: any) {
    let floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    return floatRegex.test(targetValue);
}

export function tryParseFloat(targetValue: any) {
    if (!isFloat(targetValue)) {
        return null;
    }

    let parsed = parseFloat(targetValue);

    if (Number.isNaN(parsed)) {
        return null;
    }

    return parsed;
}

export function tryParseInt(targetValue: any) {
    if (!Number.isInteger(targetValue)) {
        return null;
    }

    let parsed = parseInt(targetValue);

    if (Number.isNaN(parsed)) {
        return null;
    }
    return parsed;
}
