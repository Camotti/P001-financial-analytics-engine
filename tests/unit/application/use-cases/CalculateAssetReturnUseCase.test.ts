
import { describe, it, expect, vi } from "vitest";

import { CalculateAssetReturnUseCase } from "../../../../src/application/use-cases/CalculateAssetReturnUseCase.js";
import type { HistoricalPriceRepository } from "../../../../src/application/interfaces/HistoricalPriceRepository.js";
import { ReturnCalculator } from "../../../../src/domain/services/ReturnCalculator.js";
import { Asset } from "../../../../src/domain/entities/Assets.js";
import { HistoricalPrice } from "../../../../src/domain/entities/HistoricalPrice.js";
import { AssetType } from "../../../../src/domain/enums/AssetType.js";

describe("CalculateAssetReturnUseCase", () => {
  const asset = new Asset(1, "Apple Inc.", "AAPL", AssetType.Stock);

  const historicalPrices = [
    new HistoricalPrice(
      asset,
      new Date("2026-10-05"),
      100,
      110,
      95,
      100,
      1000
    ),
    new HistoricalPrice(
      asset,
      new Date("2026-10-06"),
      110,
      125,
      105,
      120,
      1500
    ),
  ];

  const createUseCase = (prices: HistoricalPrice[]) => {
    const repository: HistoricalPriceRepository = {
      findByAssetAndDateRange: vi.fn().mockResolvedValue(prices),
    };

    const useCase = new CalculateAssetReturnUseCase(
      repository,
      new ReturnCalculator()
    );

    return { useCase, repository };
  };

  it("calculates a positive return", async () => {
    const { useCase } = createUseCase(historicalPrices);

    const result = await useCase.execute({
      assetId: 1,
      startDate: new Date("2026-10-05"),
      endDate: new Date("2026-10-06"),
    });

    expect(result).toBeCloseTo(0.2);
  });

  it("rejects an invalid date range", async () => {
    const { useCase, repository } = createUseCase(historicalPrices);

    await expect(
      useCase.execute({
        assetId: 1,
        startDate: new Date("2026-10-07"),
        endDate: new Date("2026-10-05"),
      })
    ).rejects.toThrow("Start date cannot be after end date");

    expect(repository.findByAssetAndDateRange).not.toHaveBeenCalled();
  });

  it("rejects insufficient historical prices", async () => {
    const { useCase } = createUseCase([historicalPrices[0]!]);

    await expect(
      useCase.execute({
        assetId: 1,
        startDate: new Date("2026-10-05"),
        endDate: new Date("2026-10-06"),
      })
    ).rejects.toThrow(
      "Insufficient historical prices to calculate asset return"
    );
  });


it("calculates a negative return", async () => {
  const prices = [
    new HistoricalPrice(
      asset,
      new Date("2026-10-05"),
      120,
      125,
      110,
      120,
      1000
    ),
    new HistoricalPrice(
      asset,
      new Date("2026-10-06"),
      90,
      100,
      85,
      90,
      1500
    ),
  ];

  const { useCase } = createUseCase(prices);

  const result = await useCase.execute({
    assetId: 1,
    startDate: new Date("2026-10-05"),
    endDate: new Date("2026-10-06"),
  });

  expect(result).toBeCloseTo(-0.25);
});

it("uses the first and last closing prices, not intermediate prices", async () => {
  const prices = [
    new HistoricalPrice(
      asset, new Date("2026-10-05"), 100, 105, 95, 100, 1000
    ),
    new HistoricalPrice(
      asset, new Date("2026-10-06"), 150, 160, 140, 155, 1200
    ),
    new HistoricalPrice(
      asset, new Date("2026-10-07"), 120, 125, 110, 120, 1500
    ),
  ];

  const { useCase } = createUseCase(prices);

  const result = await useCase.execute({
    assetId: 1,
    startDate: new Date("2026-10-05"),
    endDate: new Date("2026-10-07"),
  });

  expect(result).toBeCloseTo(0.2);
});
});
