import { AssetType } from "../enums/AssetType.js";

export class Asset {

    constructor(

        public readonly id: number,
        public readonly name: string,
        public readonly symbol: string,
        public readonly type: AssetType
    ) {}
}