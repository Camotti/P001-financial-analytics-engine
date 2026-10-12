import { HistoricalPrice } from "../../domain/entities/HistoricalPrice.js";

export interface HistoricalPriceRepository {
    findByAssetAndDateRange(

        assetId: number,
        startDate: Date,
        endDate: Date
    ): Promise<HistoricalPrice[]>;
}
