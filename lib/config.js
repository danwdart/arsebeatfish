import fs from 'fs';
import {parse} from 'yaml';
import dotenv from 'dotenv';

dotenv.config()

const config = parse(
    fs.readFileSync('config/config.yml', 'utf8')
    .replace(
        new RegExp('\\$([A-Z_]+)', 'g'),
        (_match, first) => {
            if ('undefined' === typeof process.env[first]) {
                throw new Error(`${first} is not set`);
            }
            return process.env[first];
        }
    )
);

export default config;