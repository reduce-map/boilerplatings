import { Sales } from "../models/sales";
import { getAverageSalesCount } from "./salesOperations";

export enum TrendStatus{
    Stable = "stable",
    Unstable = "unstable",
    Unpopular = "unpopular",
    Popular = "popular",
    Unknown = "unknown",
    Boost = "boost",
    Descending = "descending",
    Ascending = "ascending"
}

export interface ITrendStatusDefiner{
    defineTrendStatus(enterTrend:number, stableTrend:number): TrendStatus;
}

export interface ISalesStatusDefiner{
    defineSalesStatus(totalSalesCount:number, stableSalesCount:number): TrendStatus;
}

export class BoostTrendStatusDefiner implements ITrendStatusDefiner {
    constructor(private maxPercentForBoost: number){}

    public defineTrendStatus(totalSalesCount:number, stableSalesCount:number): TrendStatus {
        const maxUnstableSales = stableSalesCount * (this.maxPercentForBoost / 100);
        const cntUnstableSales = totalSalesCount - stableSalesCount;

        if (cntUnstableSales > maxUnstableSales) return TrendStatus.Boost;
          
        return TrendStatus.Unknown;
    }
}

export class MovementTrendStatusDefiner implements ITrendStatusDefiner {
    constructor(private extremeForEnterTrend: number, private extremeForStableTrend: number){}

    defineTrendStatus(enterTrend: number, stableTrend: number): TrendStatus {
        if (enterTrend >= this.extremeForEnterTrend || stableTrend >= this.extremeForStableTrend) {
          return TrendStatus.Ascending;
        }

        if (enterTrend <= this.extremeForEnterTrend * -1 || stableTrend <= this.extremeForStableTrend * -1) {
            return TrendStatus.Descending
        }

        return TrendStatus.Unknown;
    }
}

export class StableSalesStatusDefiner implements ISalesStatusDefiner {
  constructor(private maxPercentForUnstableSales: number) {
  }
  
  defineSalesStatus(totalSalesCount: number, stableSalesCount: number): TrendStatus {
    let maxUnstableSales = stableSalesCount * (this.maxPercentForUnstableSales / 100);
    let countOfUnstable = totalSalesCount - stableSalesCount;

    if (countOfUnstable > maxUnstableSales) {
      return TrendStatus.Unstable;
    } else{
        return TrendStatus.Stable;
    }
  }
}


export default class TrendStatusDefiner{
    private trendDefiners: ITrendStatusDefiner[];
    private salesDefiner: ISalesStatusDefiner[];

    constructor(trendDefiners: ITrendStatusDefiner[], salesDefiners: ISalesStatusDefiner[]){
        this.trendDefiners = trendDefiners;  
        this.salesDefiner = salesDefiners; 
    }


    public defineTrendStatus(enterTrend:number, stableTrend:number): TrendStatus[]{
        var resultStatuses:TrendStatus[] = [];
        for(let definer of this.trendDefiners){
            let result = definer.defineTrendStatus(enterTrend, stableTrend);
            if(result != TrendStatus.Unknown){
                resultStatuses.push(result);
            } 
        }

        return resultStatuses;
    }

    public defineSalesStatus(totalSales:Sales[], stableSales:Sales[]): TrendStatus[]{
        let totalSalesCount = getAverageSalesCount(totalSales);
        let stableSalesCount = getAverageSalesCount(stableSales);

        var resultStatuses:TrendStatus[] = [];
        for(let definer of this.salesDefiner){
            let result = definer.defineSalesStatus(totalSalesCount, stableSalesCount);
            if(result != TrendStatus.Unknown){
                resultStatuses.push(result);
            }
        }

        return resultStatuses;
    }
}

export function createDefiner(options: {
    maxPercentForUnstableSales: number,
    maxPercentForBoost: number,
    extremeForEnterTrend: number,
    extremeForStableTrend: number
}){
    let salesDefiners: ISalesStatusDefiner[] = [new StableSalesStatusDefiner(options.maxPercentForUnstableSales)];
    let trendDefiners : ITrendStatusDefiner[] = [new BoostTrendStatusDefiner(options.maxPercentForBoost), new MovementTrendStatusDefiner(options.extremeForEnterTrend, options.extremeForStableTrend)];
    return new TrendStatusDefiner(trendDefiners, salesDefiners);
}