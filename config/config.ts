import * as dotenv from "dotenv"

dotenv.config()
let path: string;

switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../../.env.test`;
    break;
  case "production":
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}


dotenv.config({ path: path });

export const APP_ID = process.env.APP_ID
export const LOG_LEVEL = process.env.LOG_LEVEL
export const DB_DIALECT=process.env.DB_DIALECT
export const DB_URI=process.env.DB_URI
