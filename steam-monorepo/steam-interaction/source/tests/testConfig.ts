import { AccountMeta, Cookie } from "@team/account-contract";
import SteamID from "steamid";

export const TestConfig = Object.freeze({
    cookie:{
        steamRefresh_steam:         '',
        steamLoginSecure:           '76561199035699070%7C%7CeyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MEVGNl8yM0ZFRDdCMV81MUZGMyIsICJzdWIiOiAiNzY1NjExOTkwMzU2OTkwNzAiLCAiYXVkIjogWyAid2ViOmNvbW11bml0eSIgXSwgImV4cCI6IDE3MDg5ODY2MzQsICJuYmYiOiAxNzAwMjU4NzUyLCAiaWF0IjogMTcwODg5ODc1MiwgImp0aSI6ICIwRUY1XzIzRkVEN0IwXzZBNUQ2IiwgIm9hdCI6IDE3MDg4OTg3NTIsICJydF9leHAiOiAxNzI3MzEyNDAyLCAicGVyIjogMCwgImlwX3N1YmplY3QiOiAiOTEuMTIzLjE1MS4xNDgiLCAiaXBfY29uZmlybWVyIjogIjkxLjEyMy4xNTEuMTQ4IiB9.nvldF_fKxWfnVeN77tZfU78Nmz1mnPYzb8pkQ8Tm1n36moaGTcABgkqsCVe8ul-5_g8CF00MDV2UcDvL8olPDg',
        sessionid:                  '4d0ca7adad1ce239ecb3a3bf',
        steamCountry:               '',
        steamDataId:                '',
        steamRememberLogin:         'True',
        Steam_Language:             'english',
        steamMachineAuth:           '',
        webTradeEligibility:        '%7B%22allowed%22%3A1%2C%22allowed_at_time%22%3A0%2C%22steamguard_required_days%22%3A15%2C%22new_device_cooldown_days%22%3A7%2C%22time_checked%22%3A1706121338%7D',
        timezoneOffset:             '10800,0'
    } as Cookie,
    steamId:                        new SteamID('76561199032664256'),
    sessionId:                      '4d0ca7adad1ce239ecb3a3bf',
    proxy:                          'socks5://kXt2Y86V:HdxBh7Vy@166.1.203.93:63297',
    apiKey:                         '9782B09B1542E0256B73F7EDA22C1A4C'
})
