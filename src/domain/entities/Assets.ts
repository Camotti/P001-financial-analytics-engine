import { AssetType } from "../enums/AssetType.js";

export class Asset {

    constructor(

        public readonly id: number,
        public readonly name: string,
        public readonly symbol: string,
        public readonly type: AssetType
    ) 
    {
        if (id <= 0)
        {
            throw new Error("Asset ID must be greater than 0 ");
        }

        if (name.trim().length === 0 )
        {
            throw new Error("Asset name cannot be empty");
        }

        if (symbol.trim().length === 0 )
        {
            throw new Error("Asset symbol cannot be empty")
        }

        if (!Object.values(AssetType).includes(type))
        {
            throw new Error("Invalid Asset Type");
        }    
    }

    
}