import { HistoricalPriceRepository } from "../interfaces/HistoricalPriceRepository.js";
import { CalculateAssetReturnInput } from "../dto/CalculateAssetReturnInput.js";
import { ReturnCalculator } from "../../domain/services/ReturnCalculator.js";

export class CalculateAssetReturnUseCase {
    constructor(
        private readonly repository: HistoricalPriceRepository,
        private readonly returnCalculator: ReturnCalculator
    ) {}


async execute(input: CalculateAssetReturnInput): Promise<number> {
  if (input.startDate > input.endDate) {
    throw new Error("Start date cannot be after end date");
  }

  const prices = await this.repository.findByAssetAndDateRange(
    input.assetId,
    input.startDate,
    input.endDate
  );


if (prices.length < 2) {
  throw new Error(
    "Insufficient historical prices to calculate asset return"
  );
}

const initialPrice = prices[0];
const finalPrice = prices[prices.length - 1];

if (!initialPrice || !finalPrice) {
  throw new Error("Unable to retrieve initial and final prices");
}

return this.returnCalculator.calculate(
  initialPrice.close,
  finalPrice.close
);

}
}
