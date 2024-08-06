import dotenv from "dotenv";
dotenv.config();

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const WHITE_LIST = process.env.WHITE_LIST?.split(" ");

export const BOT_ID = IS_PRODUCTION
  ? process.env.PRODUCTION_BOT_ID
  : process.env.DEVELOP_BOT_ID;

export const URL_DB = IS_PRODUCTION
  ? process.env.PRODUCTION_URL_DB
  : process.env.LOCAL_URL_DB;
export const BOT_SEND_INFO =
  process.env.BOT_SUBSCRIBE_MESSAGE?.split(" ").map(Number);

export const PORT = process.env.PORT || 8000;
export const JWT_KEY = process.env.JWT_KEY;
export const DB_JWT_KEY = process.env.DB_JWT_KEY;
