import { Tag } from "./inventoryServiceTypes";


/**
 * @appid application (game) id
 * 
 * @contextid application context id
 * 
 * @assetid inventory asset id.
 * 
 * @classid The first half of the item cache identifier. The classid is enough to get you basic details about the item.
 * 
 * @instanceid The second half of the item cache identifier.
 * 
 * @amount How much of this item is in this stack.
 * 
 * @missing is missing item		
 * 
 * @tags array with optional information about asset (such as color, localize name)
 * 
 * @fraudwarnings An array of strings containing "fraud warnings" about the item. In inventories and trades, items with fraud warnings have a red (!) symbol, and fraud warnings are displayed in red under the item's name.
 * 
 * @owner_descriptions An array of objects containing information about the item. Displayed under the item's type.
 */

export class InventoryAssetItem {
	appid!: number;
	contextid?: string;
	assetid!: string;
	classid?: string;
	instanceid!: string;
	amount!: string;
	missing!: boolean;

	tags?: Tag[];
	fraudwarnings?: string[];
	owner_descriptions?: string[];
}
