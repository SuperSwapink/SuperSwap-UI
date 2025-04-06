export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function removeLeadingZeros(value: string): string {
    const [integerPart, decimalPart] = value.split('.');
    const cleanedIntegerPart = integerPart.replace(/^0+/, '') || '0';
    return decimalPart !== undefined
        ? `${cleanedIntegerPart}.${decimalPart}` : cleanedIntegerPart;
}