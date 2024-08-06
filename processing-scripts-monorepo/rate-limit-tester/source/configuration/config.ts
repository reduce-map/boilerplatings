import urlsConfig from "./jsonConfigs/urlsConfig.json";
import appConfig from "./jsonConfigs/appConfig.json";
import workersConfig from "./jsonConfigs/workersConfig.json";
const envConfig = {
  logFileName: process.env.LOG_FILE_NAME || "logs.log",
  resultFileName: process.env.RESULT_FILE_NAME || "results.log",
};
//check if all variables are set otherwise throw error
Object.keys(envConfig).forEach((key) => {
  const value = envConfig[key as keyof typeof envConfig];
  if (!value) throw new Error(`Missing environment variable ${key}`);
});

export const config = Object.freeze({ ...envConfig, urlsConfig, appConfig, workersConfig});
