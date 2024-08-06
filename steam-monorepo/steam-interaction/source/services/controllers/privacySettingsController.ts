import { Axios, AxiosResponse } from "axios";
import { PrivacySettings } from "../../models/exports";
import { steamUrls } from "../../steam-urls";
import { EPrivacyState } from "steam-user";

export enum EPrivacySettingName{
	Profile = "profile",
	OwnedGames = "ownedGames",
	Inventory = "inventory",
	InventoryGifts = "inventoryGifts",
	Playtime = "playtime",
	FriendsList = "friendsList"
}

export class PrivacySettingsController {
	request: Axios;
	currentSettings: PrivacySettings;
	profileId: string;
	sessionId: string;
	
	constructor(request: Axios, currentSettings: PrivacySettings, profileId: string, sessionId: string) {
		this.profileId = profileId;
		this.sessionId = sessionId
		this.request = request;
		this.currentSettings = currentSettings;
	}

	public async setPrivacySetting(privacySettingName: EPrivacySettingName, privacyState: EPrivacyState) {
		this.currentSettings[privacySettingName] = privacyState;
		return await this.updatePrivacySettings();
	}

	//#region update privacy settings
	private async updatePrivacySettings(): Promise<boolean> {
		const requestUrl = `${steamUrls.steamProfileUrl}/${this.profileId}/ajaxsetprivacy/`;
		const response: AxiosResponse = await this.request.post(requestUrl, {
			sessionid: this.sessionId,
			Privacy: JSON.stringify({
				PrivacyProfile: this.currentSettings.profile,
				PrivacyInventory: this.currentSettings.inventory,
				PrivacyInventoryGifts: this.currentSettings.inventoryGifts,
				PrivacyOwnedGames: this.currentSettings.ownedGames,
				PrivacyPlaytime: this.currentSettings.playtime,
				PrivacyFriendsList: this.currentSettings.friendsList,
			}),
			eCommentPermission: 0
		});
		if (response.data.success) {
			return true;
		}
		return false;
	}
	//#endregion
}
