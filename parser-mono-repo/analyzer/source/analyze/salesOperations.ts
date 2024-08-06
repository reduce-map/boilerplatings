import { Sales } from "../models/sales";
import { DatePeriod } from "../models/datePeriod";
import { calculateMedian } from "../utils/math";
import moment from "moment";


//#region Average price and count of Sales
export function getAveragePriceByPoints(targetSales : Sales[]) : number{
    return getAverageFromSale(targetSales, (sale) => sale.price);
}

export function getAveragePriceBySales(targetSales : Sales[]) : number{
    return getAverageFromSale(targetSales, (sale) => sale.price * sale.count);
}


function getAverageFromSale(sales: Sales[], averageGetter: (sale: Sales) => number) : number{   
    let result = 0;
    sales.forEach((sale) => {
        result += averageGetter(sale);
    });
    return result / sales.length;
}

/**
 * **DEPRICATED DO NOT USE THIS FUNCTION ANYMORE**
 * @param targetSales 
 * @returns 
 */
export function getAverageSalesCount(targetSales : Sales[]) : number{
    let startGap = moment(targetSales[0].date);
    let endGap = moment(targetSales[targetSales.length - 1].date);
    let daysCount = Math.abs(startGap.diff(endGap, "days", true)) + 1;

    let totalSalesCount = targetSales.reduce((previousCount, currentSale) => previousCount + currentSale.count, 0);

    return totalSalesCount / daysCount;
}

export function getAverageSalesCountByDay(targetSales : Sales[], targetDaysCount: number) : number{

    let totalSalesCount = targetSales.reduce((previousCount, currentSale) => previousCount + currentSale.count, 0);

    return totalSalesCount / targetDaysCount;
}

//#endregion


//#region Charts analysis

export function calculateMedianPrice(sales: Sales[]): number {
    return calculateTargetMedian(sales, (sale) => sale.price);
}

export function calculateMedianCount(sales: Sales[]): number {
    
    return calculateTargetMedian(sales, (sale) => sale.count);
}

function calculateTargetMedian(sales: Sales[], targetMedianGetter: (sale: Sales) => number) : number{
    return calculateMedian(sales.map(targetMedianGetter));
}

//#endregion

//#region Trend analysis
export function calculatePercentChangesBetween(averageStartGap : number, averageEndGap : number) : number{
        return (averageEndGap / averageStartGap * 100) - 100
}

export type NumberRange = {min:number, max:number};
export function getStablePriceRange(averagePrice: number, corridor: number) : NumberRange{
    let scalingFactor = corridor / 100;
    let maxPrice = +((Math.ceil((averagePrice * (scalingFactor + 1)) * 1000) / 1000) + 0.02).toFixed(3);
    let minPrice = + Math.abs(((Math.floor((averagePrice * (scalingFactor - 1)) * 1000) / 1000) - 0.02)).toFixed(3);
    return { min: minPrice, max: maxPrice };
}

export function getStableSales(sales: Sales[], corridor: number){
        let medianPrice = calculateMedianPrice(sales);
        let stablePriceRange = getStablePriceRange(medianPrice, corridor);
        let result: Sales[] = [];

        sales.forEach((sale) => {
            if(sale.price >= stablePriceRange.min && sale.price <= stablePriceRange.max){
                result.push(sale);
            }
        });

        return result;
}
//#endregion

