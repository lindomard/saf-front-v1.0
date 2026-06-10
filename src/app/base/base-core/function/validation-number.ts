export function isNumeric(n: any): boolean {
    return !isNaN(parseInt(n)) && isFinite(n);
}

