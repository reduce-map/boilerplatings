import { AutoMap } from "@automapper/classes";
import { Guid } from "guid-ts";
import { Cookie } from "./accountCookie";
import { Types } from "@team/polydata";

export class AccountCredentials {
    @AutoMap()
    login: string = '';
    @AutoMap()
    password:string ='';
    @AutoMap()
    shared_secret: string = '';
    @AutoMap()
    identity_secret:string = '';
    @AutoMap()
    refresh_token?:string
}

export class AccountMeta {
    @AutoMap()
    id?: string;
    @AutoMap()
    cookie?: Cookie;
    @AutoMap()
    ownerKey: string = '';
    @AutoMap()
    accIndex: number = 0;
    @AutoMap()
    currency: string = '';
    @AutoMap()
    credentials:AccountCredentials = new AccountCredentials();

    constructor(id?: string) {
        this.id = id;
    }

    public static generateAccount() {
        const accountId = new Types.ObjectId(Types.ObjectId.generate()).toString();
        const account = new AccountMeta(accountId);
        return account;
    }
}