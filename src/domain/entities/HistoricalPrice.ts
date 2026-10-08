import { Asset } from "./Assets.js";

export class HistoricalPrice {

    constructor(

        public readonly asset: Asset,
        public readonly date: Date,
        public readonly open: number,
        public readonly high: number,
        public readonly low: number,
        public readonly close: number,
        public readonly volume: number
    ) {

       if (!asset)
        {
            throw new Error("Historical Price must have an Asset")
        } 

        if (Number.isNaN(date.getDate()))
        {
            throw new Error("Historical Price must have a valid date")
        }

        if (open <= 0)
        {
            throw new Error("Opening price must be greater than 0")
        }

        if (high <= 0)
        {
            throw new Error("High price must be greater than 0")
        }

        if (low <= 0)
        {
            throw new Error("Low must be greater than 0")
        }

        if (volume < 0) 
        {
            throw new Error("Volume cannot be negative");
        }

        if (open < low || open > high)
        {
            throw new Error("Opening price must be between low and high")
        }

        if (close < low || close > high)
        {
             throw new Error("Closing price must be between low and high");
        }

        
    }
}