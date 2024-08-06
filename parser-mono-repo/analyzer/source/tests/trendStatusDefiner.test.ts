import { expect } from "chai";
import TrendStatusDefiner, {
  BoostTrendStatusDefiner,
  TrendStatus,
  MovementTrendStatusDefiner,
  StableSalesStatusDefiner,
  createDefiner,
  ISalesStatusDefiner,
  ITrendStatusDefiner,
} from "../analyze/trendStatusDefiner";

type BoostTrendStatusDefinerTestsConfig<T> = {
  maxPercentForBoost: number;
  definer: T;
  totalSalesCount: number;
  stableSalesCount: number;
};

//Test is not logical, bcs you are testing the functions which are depended on other.
//Move dependencies to the top of calling hierarchy
//You can separate such dependencies by describe() function
//Each describe have own pass function
//Each pass function have own test functions

function passTrendStatusDefinerTests() {
  describe("BoostTrendStatusDefiner tests", passBoostTrendStatusDefinerTests);
  describe("StableSalesStatusDefiner", passStableSalesStatusDefinerTests);
  describe("TrendStatusDefiner tests", passDefineTrendStatus);
  describe("MovementTrendStatusDefiner tests", passMovementTrendStatusDefinerTests);
}

function passBoostTrendStatusDefinerTests() {
  const config: BoostTrendStatusDefinerTestsConfig<BoostTrendStatusDefiner> = {
    maxPercentForBoost: 20,
    definer: new BoostTrendStatusDefiner(20),
    totalSalesCount: 100,
    stableSalesCount: 70,
  };
  testBoostStatus(config);
  testUnknownStatus(config);
}
function passStableSalesStatusDefinerTests() {
  const config: BoostTrendStatusDefinerTestsConfig<StableSalesStatusDefiner> = {
    maxPercentForBoost: 20,
    definer: new StableSalesStatusDefiner(20),
    totalSalesCount: 100,
    stableSalesCount: 70,
  };

  testUnstableSalesStatus(config);
  testStableSalesStatus(config);
}
//Move describe() function to the top of calling hierarchy
//Name functions for describe() as pass test, bcs you are using it to pass tests and configure some required data
function passDefineTrendStatus() {
  const definer: TrendStatusDefiner = CreateTrendStatusDefiner();
  const enterTrend = 45;
  const stableTrend = 45;
  let resultStatuses: TrendStatus[] = [];

  resultStatuses = definer.defineTrendStatus(enterTrend, stableTrend);

  testCreateDefiner();
  testDefineTrendStatus(resultStatuses);
}
function passMovementTrendStatusDefinerTests() {
  const extremeForEnterTrend = 50;
  const extremeForStableTrend = 40;
  const definer = new MovementTrendStatusDefiner(extremeForEnterTrend, extremeForStableTrend);

  testMovementTrendStatusDefiner(definer);
}

function CreateTrendStatusDefiner() {
  const options = {
    maxPercentForUnstableSales: 20,
    maxPercentForBoost: 10,
    extremeForEnterTrend: 50,
    extremeForStableTrend: 30,
  };
  return createDefiner(options);
}

function testCreateDefiner() {
  it("should create a TrendStatusDefiner instance with provided options - createDefiner()", () => {
    const definer = CreateTrendStatusDefiner();
    expect(definer).to.be.an.instanceOf(TrendStatusDefiner);
  });
}

function testDefineTrendStatus(resultStatuses: TrendStatus[]) {
  it("should define TrendStatus array based on trend definers", () => {
    expect(resultStatuses).to.be.deep.equal([TrendStatus.Ascending]);
  });
}

function testUnstableSalesStatus(config: BoostTrendStatusDefinerTestsConfig<StableSalesStatusDefiner>) {
  it("should define TrendStatus as Unstable when maxPercentForUnstableSales condition is met", () => {
    const resultStatus = config.definer.defineSalesStatus(config.totalSalesCount, config.stableSalesCount);
    expect(resultStatus).to.be.equal(TrendStatus.Unstable);
  });
}

function testStableSalesStatus(config: BoostTrendStatusDefinerTestsConfig<StableSalesStatusDefiner>) {
  it("should define TrendStatus as Stable when maxPercentForUnstableSales condition is not met", () => {
    config.stableSalesCount = 90;
    const resultStatus = config.definer.defineSalesStatus(config.totalSalesCount, config.stableSalesCount);
    expect(resultStatus).to.be.equal(TrendStatus.Stable);
  });
}

function testMovementTrendStatusDefiner(definer: MovementTrendStatusDefiner) {
  it("should define TrendStatus as Ascending when extreme conditions are met - MovementTrendStatusDefiner.defineTrendStatus()", () => {
    const enterTrend = 60;
    const stableTrend = 45;
    const resultStatus = definer.defineTrendStatus(enterTrend, stableTrend);

    expect(resultStatus).to.be.equal(TrendStatus.Ascending);
  });
}

function testBoostStatus(config: BoostTrendStatusDefinerTestsConfig<BoostTrendStatusDefiner>) {
  it("should define TrendStatus correctly based on boost condition - defineTrendStatus()", () => {
    const resultStatus = config.definer.defineTrendStatus(config.totalSalesCount, config.stableSalesCount);
    expect(resultStatus).to.be.equal(TrendStatus.Boost);
  });
}

function testUnknownStatus(config: BoostTrendStatusDefinerTestsConfig<BoostTrendStatusDefiner>) {
  it("should define TrendStatus as Unknown when boost condition is not met - defineTrendStatus()", () => {
    config.stableSalesCount = 90;
    const resultStatus = config.definer.defineTrendStatus(config.totalSalesCount, config.stableSalesCount);

    expect(resultStatus).to.be.equal(TrendStatus.Unknown);
  });
}

describe("TrendStatusDefiner tests", passTrendStatusDefinerTests);
