import { SteamAccount } from "@team/polydata";
import { AccountCredentials } from "@team/account-contract";

export function mapAccountToCredentials(account: SteamAccount): AccountCredentials {
    return {
        login: account.credentials.login,
        password: account.credentials.password,
        shared_secret: account.credentials.shared_secret,
        identity_secret: account.credentials.identity_secret,
        refresh_token: account.credentials.refresh_token
    };
}