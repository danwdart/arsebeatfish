import dotenv from "dotenv";
import {readFileSync} from "fs";
import {parse} from "yaml";

dotenv.config();

const config = parse(
    readFileSync("config/config.yml", "utf8")
    .replace(
        new RegExp("\\$([A-Z_]+)", "g"),
        (_match: string, first: string): string => {
            const firstMatch = process.env[first];
            if ("undefined" === typeof firstMatch) {
                throw new Error(`${first} is not set`);
            }
            return firstMatch;
        },
    ),
);

export default config;
