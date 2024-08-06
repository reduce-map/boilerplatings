import { expect } from "chai";
import { Sales } from "..";
import {
    calculateMedianCount,
    calculateMedianPrice,
    calculatePercentChangesBetween,
    getAverageSalesCount as getAverageCount,
    getAveragePriceByPoints,
    getStablePriceRange,
    getStableSales,
} from "../analyze/salesOperations";
import { calculateMedian } from "../utils/math";
import moment from "moment";

function passSalesOperationsTests() {
    const sales = generateRandomSales();

    testGetAveragePriceByPoints(sales);
    testGetAverageCountPerDay();

    testCalculateMedianPrice(sales);
    testCalculateMedianCount(sales);

    testCalculatePercentChangesBetween();
    testGetStablePriceRange();
    testGetStableSales();
}

function testGetAverageCountPerDay() {
    it("should calculate the average count correctly - getAverageCount()", () => {
        const sales: Sales[] = [
            { price: 45, count: 5, date: new Date() },
            { price: 50, count: 10, date: new Date() },
            { price: 60, count: 8, date: moment().subtract(1, "days").toDate() },
        ];

        // Calculate the expected number of stable sales manually
        // we have only two days, so the expected number of count per two days is 11.5

        const targetExpectedCount = 11.5;
        let result = getAverageCount(sales);

        expect(result).to.be.equal(targetExpectedCount); // Calculate the expected number of stable sales manually
    });
}

function testGetStableSales() {
    it("should filter stable sales correctly - testGetStableSales()", () => {
        const corridor = 10;
        const sales: Sales[] = [
            { price: 45, count: 5, date: new Date() },
            { price: 50, count: 10, date: new Date() },
            { price: 60, count: 8, date: new Date() },
        ]; // not stable will be all which is out of condition - price != median +- 10%

        const targetStableSaleCount = 1;

        const stableSales = getStableSales(sales, corridor);

        expect(stableSales.length).to.be.equal(targetStableSaleCount);
    });
}

function testGetStablePriceRange() {
    it("should calculate stable price range correctly - getStablePriceRange()", () => {
        const averagePrice = Math.floor(Math.random() * 50);
        const corridor = Math.floor(Math.random() * 2 + 1);
        const range = getStablePriceRange(averagePrice, corridor);

        const scalingFactor = corridor / 100;
        // Calculate the expected max price manually
        const maxPrice = Math.abs(+(Math.ceil(averagePrice * (scalingFactor + 1) * 1000) / 1000 + 0.02).toFixed(3));
        // Calculate the expected min price manually
        const minPrice = Math.abs(+(Math.floor(averagePrice * (scalingFactor - 1) * 1000) / 1000 - 0.02).toFixed(3));

        expect(range.min).to.be.equal(minPrice);
        expect(range.max).to.be.equal(maxPrice);
    });
}

function testCalculatePercentChangesBetween() {
    it("should calculate percent changes correctly - calculatePercentChangesBetween()", () => {
        const averageStartGap = Math.floor(Math.random() * 200);
        const averageEndGap = Math.floor(Math.random() * 200);
        const percentChange = calculatePercentChangesBetween(averageStartGap, averageEndGap);

        //Calculate the expected percent change manually
        expect(percentChange).to.be.equal((averageEndGap / averageStartGap) * 100 - 100);
    });
}

function testGetAveragePriceByPoints(sales: Sales[]) {
    it("should calculate the average price correctly - getAveragePrice()", (done) => {
        let sum = sales.reduce((previousCount, currentSale) => previousCount + currentSale.price, 0);

        const averagePrice = getAveragePriceByPoints(sales);
        expect(averagePrice).to.be.equal(sum / sales.length);
        done();
    });
}

function testCalculateMedianPrice(sales: Sales[]) {
    it("should calculate the median price correctly - calculateMedianPrice()", (done) => {
        let median = calculateMedian(sales.map((x) => x.price));
        const medianPrice = calculateMedianPrice(sales);

        expect(medianPrice).to.equal(median);
        done();
    });
}

function testCalculateMedianCount(sales: Sales[]) {
    it("should be calculate the median count correctly - calculateMedianCount()", (done) => {
        let median: number = calculateMedian(sales.map((x) => x.count));
        const medianCount: number = calculateMedianCount(sales);

        expect(medianCount).to.equal(median);
        done();
    });
}

function generateRandomSales() {
    const historyPoints: Sales[] = [];

    for (let i = 0; i < 10; i++) {
        const randomPrice = Math.floor(Math.random() * 100);
        const randomCount = Math.floor(Math.random() * 100);

        const historyPoint = {
            price: randomPrice,
            count: randomCount,
            date: new Date(),
        };

        historyPoints.push(historyPoint);
    }

    return historyPoints;
}

describe("SalesOperations tests", passSalesOperationsTests);
