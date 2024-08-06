import { ETradeOfferConfirmationMethod } from "steam-user";
import { EConfirmationType } from "../../enums/EConfirmationType";
/**
 * @type confirmation method (mobile , email)
 * @typeName confirmation type (such as Trade Offer)
 * @id confirmation id
 * @creatorId user who created this confirmation
 * @nonce one-time code for accept confirmation
 * @creationTime confirmation creation date
 * @multi confirmation with multiple accounts
 * @summary description confirmation
 * @warn warnings
 */
export class Confirmation {
	type!: EConfirmationType;
	typeName!: string;
	id!: string;
	creatorId!: string;
	nonce!: string;
	creationTime?: Date;
	icon!: string;
	multi!: boolean;
	summary!: string[];
	warn: any | null;

	constructor(rawConfData?: any) {
		if (!rawConfData) {
			return;
		}
		this.type = rawConfData?.type;
		this.typeName = rawConfData?.type_name;
		this.id = rawConfData?.id;
		this.creatorId = rawConfData?.creator_id;
		this.nonce = rawConfData?.nonce;
		this.icon = rawConfData?.icon;
		this.multi = rawConfData?.multi;
		this.summary = rawConfData?.summary || [];
		this.warn = rawConfData?.warn;

		this.creationTime = rawConfData?.creation_time ? new Date(rawConfData.creation_time * 1000) : undefined;
	}
}
