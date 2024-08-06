import { get } from "http";
import { DatePeriod } from "../models/datePeriod";
import { ItemPriceHistoryPoint } from "../models/itemPriceHistoryPoint";
import { Sales } from "../models/sales";
import { getDatesInRange } from "../utils/dateUtils";
import { listenerCount } from "process";
import { getStableSales } from "./salesOperations";
import moment from "moment";

export class PeriodSalesAnalyzer {
    public analyzingStatistic: Array<ItemPriceHistoryPoint> = [];

    public constructor(targetStatistic: Array<ItemPriceHistoryPoint>) {
        this.analyzingStatistic = targetStatistic;
    }

    public getStableSales(period: DatePeriod, corridor: number): Sales[] {
        let sales = this.getSales(period);
        return getStableSales(sales, corridor);
    }

    public getSales(period: DatePeriod): Sales[] {
        if (period.periodEnterDate > period.periodExitDate) {
            throw new RangeError("Enter gap can't be bigger than exit gap");
        }

        return this.getSalesForDateGap(period.periodEnterDate, period.periodExitDate);
    }

    private getSalesForDateGap(enterGap: Date, exitGap: Date): Sales[] {

        let momentEnterGap = moment(enterGap);
        let momentExitGap = moment(exitGap);

        let gapSales = this.analyzingStatistic.filter((item) => moment(new Date(item.date)).isBetween(momentEnterGap, momentExitGap))

        return gapSales.map<Sales>((historyPoint) => ({ count: historyPoint.salesCount, price: historyPoint.price, date: new Date(historyPoint.date)}));
    }

}
