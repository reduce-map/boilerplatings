import { EPrivacyState } from "steam-user";

export type NameHistoryItem={
    newname: string,
    timechanged: Date 
}

export type PersonalInfo={
    personaName: string,
    realName: string,
    summary: string,
    country: string,
    regionState: string,
    city: string,
}

export type PrivacySettings = {
    profile: EPrivacyState;
    ownedGames: EPrivacyState;
    inventory: EPrivacyState;
    inventoryGifts: EPrivacyState;
    playtime: EPrivacyState;
    friendsList: EPrivacyState;
};

export type TradeUrlResponse={
    token:String,
    url:String
}