import { EPurchaseResult, EResult } from "steam-user"

export type RedeemWalletCodeResponse = {
    success: EResult
    detail?: EPurchaseResult,

    result?: boolean,
    formattedNewWalletBalance?: number,
    amount?: number
}