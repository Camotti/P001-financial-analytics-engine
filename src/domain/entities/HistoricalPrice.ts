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
    ) {}
}