import { injectable } from "inversify";
import { CookieEntry, SteamAccount, SteamAccountAttached, SteamCredentials } from "@team/polydata";
import { IRepository } from "@team/polydata";

@injectable()
export class AccountRepositoryController {
    private accountRepository: IRepository<SteamAccount>;

    public constructor(accountRepository: IRepository<SteamAccount>) {
        this.accountRepository = accountRepository;
    }

    public async getAssignedCookie(account: SteamAccount) {
        if (!account) {
            throw new ReferenceError("Account was undefined");
        }
        return account.attached?.cookie;
    }

    public async attachRefreshToken(targetAccount: SteamAccount, refresh_token: string) {
        if (!targetAccount) {
            throw new ReferenceError("Account was undefined");
        }
        if(!targetAccount.credentials) {
            targetAccount.credentials = new SteamCredentials()
        }
        targetAccount.credentials.refresh_token = refresh_token;
        await this.updateAccount(targetAccount);
    }

    public async attachCookie(account: SteamAccount, cookie: CookieEntry[]) {
        if (!account || !cookie) {
            throw new ReferenceError("Passed parameter was undefined");
        }

        if(!account.attached) {
            account.attached = new SteamAccountAttached()
        }
        account.attached.cookie = cookie;
        await this.updateAccount(account);
    }

    private async updateAccount(targetAccount: SteamAccount){
        if (targetAccount._id) {
            await this.accountRepository.updateAsync(targetAccount._id.toString(), targetAccount);
        } else {
            await this.accountRepository.createAsync(targetAccount);
        }
    }
}
