export function toCurrency(value) {
    let formmater = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return formmater.format(value)
}

export function toRemoveCurrency(value): string {
    value = value.replace('.', '');
    return value.replace('R$', '').replace(',', '.').trimLeft();
} 

export function toNumberBigDecimal(value): number {
    value = value.replace('.', '');
    return Number(value.replace('R$', '').replace(',', '.').trimLeft());
} 