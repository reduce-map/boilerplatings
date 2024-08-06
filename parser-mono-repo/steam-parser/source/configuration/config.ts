import dotenv from "dotenv";
import jsonConfig from "../config.json";
import url from "url";
dotenv.config({ debug: true });

const envConfig = {
  credentialsDbConnectionString: process.env.CREDENTIALS_DB_CONNECTION_STRING || "",
  steamItemsClusterConnectionString: process.env.STEAM_ITEMS_CLUSTER_CONNECTION_STRING || "",
  steamItemsClusterConnectionStringParams: process.env.STEAM_ITEMS_CLUSTER_CONNECTION_STRING_PARAMS || " ",
  steamItemsClusterAuthSource: process.env.STEAM_ITEMS_CLUSTER_AUTH_SOURCE || "",
  steamItemsClusterDBPrefix: process.env.STEAM_ITEMS_CLUSTER_DB_PREFIX || "",
};
//check if all variables are set otherwise throw error
Object.keys(envConfig).forEach((key) => {
  const value = envConfig[key as keyof typeof envConfig];
  if (!value) throw new Error(`Missing environment variable ${key}`);
});

export const config = Object.freeze({ ...envConfig, ...jsonConfig });

export function getItemDbConnectionString(appId: number) {
  if(config.steamItemsClusterConnectionString.endsWith("/")) {
   return config.steamItemsClusterConnectionString + `${config.steamItemsClusterDBPrefix + appId}${config.steamItemsClusterConnectionStringParams}`;
  }
   return config.steamItemsClusterConnectionString + `/${config.steamItemsClusterDBPrefix + appId}${config.steamItemsClusterConnectionStringParams}`;
  
}
