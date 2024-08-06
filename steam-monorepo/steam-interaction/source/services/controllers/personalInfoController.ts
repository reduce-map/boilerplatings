import { Axios, AxiosResponse } from "axios";
import { PersonalInfo } from "../../models/exports";
import { steamUrls } from "../../steam-urls";
import { EResult } from "steam-session";

export enum EPersonalInfoSettingName {
    PersonaName = "personaName",
    RealName = "realName",
    Summary = "summary",
    CountryCode = "country",
    RegionStateCode = "regionState",
    CityId = "city"
}

export class PersonalInfoController {
    request: Axios;
    profileInfo: PersonalInfo;
    profileId: string;
    sessionId: string;

    constructor(request: Axios, currentInfo: PersonalInfo, profileId: string, sessionId: string) {
        this.profileId = profileId;
        this.sessionId = sessionId;
        this.request = request;
        this.profileInfo = currentInfo;
    }

    public async setPersonalInfo(settingName: EPersonalInfoSettingName, value: string){
        this.profileInfo[settingName] = value;
        return await this.updateProfileInfo();
    }

    //#region update profile info
    private async updateProfileInfo(): Promise<boolean> {
        const requestUrl = `${steamUrls.steamProfileUrl}/${this.profileId}/edit/`;
        const response: AxiosResponse = await this.request.post(requestUrl, {
            sessionID: this.sessionId,
            json: 1,
            type: "profileSave",
            weblink_1_title: "",
            weblink_1_url: "",
            weblink_2_title: "",
            weblink_2_url: "",
            weblink_3_title: "",
            weblink_3_url: "",
            customURL: "",
            personaName: this.profileInfo.personaName,
            real_name: this.profileInfo.realName,
            summary: this.profileInfo.summary,
            country: this.profileInfo.country,
            state: this.profileInfo.regionState,
            city: this.profileInfo.city,
        });
        if (response.data.success != EResult.OK) {
            return false;
        }
        return true;
    }
    //#endregion
}
