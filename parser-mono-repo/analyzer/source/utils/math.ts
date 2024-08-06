
//#region  Median calculation
// const prices = [15, 25, 25, 35, 25, 35, 500, 35, 500, 25];
// const defaultMedian = calcDefaultMedian(prices)
// console.log(`Default : ${defaultMedian}`);
// const medianPrice = calculateMedian(prices);
// console.log(`Медиана без учета аномальных значений: ${medianPrice}`);
export function calculateMedian(values: number[]): number {
    var sorted = new Array<number>(...values);
    sorted.sort((a, b) => a - b);

    const Q1 = percentile(sorted, 25);
    const Q3 = percentile(sorted, 75);
    const IQR = Q3 - Q1;

    const lowerBound = Q1 - 1.5 * IQR;
    const upperBound = Q3 + 1.5 * IQR;

    const filteredPrices = sorted.filter(price => price >= lowerBound && price <= upperBound);

    return median(filteredPrices);
}


export function percentile(arr: number[], q: number): number {
    const sorted = [...arr];
    const pos = (sorted.length - 1) * q / 100;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
}

export function median(arr: number[]): number {
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
}

//#endregion