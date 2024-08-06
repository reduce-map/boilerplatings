import { expect } from "chai";
import { DatePeriod, ItemPriceHistoryPoint, Sales } from "..";
import { PeriodSalesAnalyzer } from "../analyze/periodSalesAnalyzer";
import { getStableSales } from "../analyze/salesOperations";
import moment, { Duration} from "moment";


let periodOffsetNumber=1;
let periodDateTimeIdentifier:moment.unitOfTime.DurationConstructor = "days";

function passPeriodSalesAnalyzerTests() {
    
    describe('Test return sales for some period - getSales()', passGetSalesTests);
    describe('Test return stable sales for some period - getStableSales()', passGetStableSalesTest);
   
}

function passGetSalesTests() {
    let datePeriod:DatePeriod=getDatePeriodFromNow(periodOffsetNumber, periodDateTimeIdentifier);
    let analyzer:PeriodSalesAnalyzer=createPeriodSalesAnalyzer(datePeriod);
    let firstPoint:ItemPriceHistoryPoint=analyzer.analyzingStatistic[0];

    //Test for one day period
    getSalesForDatePeriodTest({periodEnterDate:firstPoint.date, periodExitDate:firstPoint.date}, analyzer)
    //Test for one month date period
    getSalesForDatePeriodTest(datePeriod,analyzer)
}


function passGetStableSalesTest(){
    let datePeriod:DatePeriod=getDatePeriodFromNow(periodOffsetNumber, periodDateTimeIdentifier);
    let analyzer:PeriodSalesAnalyzer=createPeriodSalesAnalyzer(datePeriod);

    getStableSalesTest(datePeriod,analyzer);
}

function createPeriodSalesAnalyzer(datePeriod:DatePeriod):PeriodSalesAnalyzer{
    let randomHistoryPoints=generateRandomItemPriceHistoryPoints(datePeriod.periodEnterDate,datePeriod.periodExitDate);
    let analyzer:PeriodSalesAnalyzer=new PeriodSalesAnalyzer(randomHistoryPoints);
    return analyzer;
}



function getSalesForDatePeriodTest(period: DatePeriod, analyzer:PeriodSalesAnalyzer){
    it('should return sales for a date period',(done)=>{
        const sales:Sales[]=analyzer.getSales(period);
        sales.forEach(sale => {
            const searchResult = analyzer.analyzingStatistic
                    .find(x => x.price == sale.price && x.salesCount == sale.count);
            expect(searchResult).to.be.not.undefined;
        })
        done();
    })
}

function getStableSalesTest(datePeriod:DatePeriod,analyzer:PeriodSalesAnalyzer) {
    it('should return stable sales for a period - getStableSales()', (done) => {
        const corridor = 36;
        const stableSales = analyzer.getStableSales(datePeriod, corridor);
        
        let stableTargetSales = analyzer.analyzingStatistic.map(x => ({count: x.salesCount, price:x.price, date: new Date(x.date)}));
        getStableSales(stableTargetSales, corridor).forEach(sale => {
            const searchResult = stableSales.find(x => x.price == sale.price && x.count == sale.count);
            if(!searchResult) {
                console.log(sale)
                console.log(stableSales)
            }
            expect(searchResult).to.be.not.undefined;
        })
        done();
    });
}


function getDatePeriodFromNow(offsetNumber : number, dateTimeIdentifier:moment.unitOfTime.DurationConstructor):DatePeriod{

    let nowDate = moment();
    let startDate = nowDate.clone().subtract(offsetNumber, dateTimeIdentifier).toDate();

    let datePeriod:DatePeriod={
        periodEnterDate:startDate,
        periodExitDate:nowDate.toDate(),
    }

    return datePeriod
}





/**
 * @returns array of random ItemPriceHistoryPoint
 */
function generateRandomItemPriceHistoryPoints(startDate: Date, endDate: Date) {
    const historyPoints: ItemPriceHistoryPoint[] = [];
  
    for (let i = 0; i < 10; i++) {        
        let randomDate = generateRandomDateWithConstantTime(startDate, endDate);
        const randomPrice = Math.floor(Math.random() * 100);
        const randomCount = Math.floor(Math.random() * 100);
    
        const historyPoint = {
            date: randomDate,
            price: randomPrice,
            salesCount: randomCount,
        };
    
        historyPoints.push(historyPoint);
    }
  
    return historyPoints;
}

/**
 * Generate a random date between start and end dates with the same time
 * @param startDate start date for generating
 * @param endDate end date for generating
 * @returns a date between start and end dates with the same time
 */
function generateRandomDateWithConstantTime(startDate: Date, endDate: Date) {
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    const randomDate = new Date(randomTime);    
    
    return randomDate;
  }

describe('PeriodSalesAnalyzer tests', passPeriodSalesAnalyzerTests);
