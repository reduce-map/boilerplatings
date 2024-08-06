import { AccountCredentials } from "@team/account-contract";

export type AdditionalTestAccountCredentials = {
    webRefreshToken: string;
}
export type TestAccountCredentials = AccountCredentials & AdditionalTestAccountCredentials;
const firstAccountCredentials: TestAccountCredentials = {
  login: "zykinariton95",
  password: "WT3o0SmZppA",
  shared_secret: "3vY88W7Ts4tFcVY0LKgExk9MMm8=",
  identity_secret: "f3vdypaeouqLHtfefCLgjpvFSh8=",
  refresh_token: "",
  webRefreshToken: "eyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInN0ZWFtIiwgInN1YiI6ICI3NjU2MTE5OTAzNTY5OTA3MCIsICJhdWQiOiBbICJ3ZWIiLCAicmVuZXciLCAiZGVyaXZlIiBdLCAiZXhwIjogMTcyNDMzMjA3NSwgIm5iZiI6IDE2OTc0Nzk4NTksICJpYXQiOiAxNzA2MTE5ODU5LCAianRpIjogIjBFMzRfMjNEOUVGODJfMjZBNDYiLCAib2F0IjogMTcwNjExOTg1OSwgInBlciI6IDEsICJpcF9zdWJqZWN0IjogIjE2Ni4xLjIwNC43MSIsICJpcF9jb25maXJtZXIiOiAiMTY2LjEuMjA0LjcxIiB9.G_P_CAH3GI0BgKR0d5H7pgBo2tGXazm6kSYMztcOFYONO_aKdcr7hVP7E5IvCncyUzLQBXD1jIbsG4CaoxtuDg"
};

const secondAccountCredentials: TestAccountCredentials = {
  login: "zyelchiverton1986",
  password: "wcOk3SYdV8J",
  shared_secret: "cialFOvbtw5ak5Ylzf8wG0+ojPk=",
  identity_secret: "EAGrfEYvhQ4vVSZS9gPWTUZxIHQ=",
  refresh_token: "",
  webRefreshToken: "eyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInN0ZWFtIiwgInN1YiI6ICI3NjU2MTE5OTAzMjY2NDI1NiIsICJhdWQiOiBbICJ3ZWIiLCAicmVuZXciLCAiZGVyaXZlIiBdLCAiZXhwIjogMTcyNDM1NTIzMywgIm5iZiI6IDE2OTc0Nzk4NTksICJpYXQiOiAxNzA2MTE5ODU5LCAianRpIjogIjBFMzVfMjNEOUVGN0VfQzM2ODgiLCAib2F0IjogMTcwNjExOTg1OSwgInBlciI6IDEsICJpcF9zdWJqZWN0IjogIjE2Ni4xLjIyMy4xMjUiLCAiaXBfY29uZmlybWVyIjogIjE2Ni4xLjIyMy4xMjUiIH0.aaM68hBinja5fO11KzxbkdJTZMvzbun2OlE428x1lrCz6u1p8aTJIdyZxvFLzTdt3Ceh6xueyMATLUwm3RqUCQ"
}

export const firstAccount = Object.freeze(firstAccountCredentials);
export const secondAccount = Object.freeze(secondAccountCredentials);
