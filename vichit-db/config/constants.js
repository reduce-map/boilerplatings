import dotenv from "dotenv";
dotenv.config();

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const PORT = process.env.PORT || 3030;
export const WHITE_LIST = process.env.WHITE_LIST?.split(" ");
export const JWT_KEY = process.env.JWT_KEY;
