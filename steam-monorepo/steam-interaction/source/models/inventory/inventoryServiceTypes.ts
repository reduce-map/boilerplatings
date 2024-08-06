import { EResult } from "steam-user";
import { Asset } from "../asset";
import { InventoryAssetItem } from "./inventoryAssetItem";

export type GetInventoryParams = {
	profileId64: string;
	appID: number;

	language?: string;
	count?: number;
	startAssetId?: string;
};
export type Tag = {
	category: string;
	internal_name: string;
	localized_category_name: string;
	localized_tag_name: string;
	color?: string;
};

export type GetInventoryResult = {
	more_items?: number;
	last_assetid?: string;
	total_inventory_count: number;
	success: EResult;
	descriptions: Asset[];
	assets: InventoryAssetItem[];
};
