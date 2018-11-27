import dotenv from "dotenv";
import { readFileSync } from "fs";
import { parse } from "yaml";
dotenv.config();
const config = parse(readFileSync("config/config.yml", "utf8")
    .replace(new RegExp("\\$([A-Z_]+)", "g"), (match, first) => {
    if ("undefined" === typeof process.env[first]) {
        throw new Error(`${first} is not set`);
    }
    return process.env[first];
}));
export default config;
