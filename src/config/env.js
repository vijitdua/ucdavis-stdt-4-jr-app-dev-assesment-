import dotenv from "dotenv";
import {join} from "path";

dotenv.config();

const projectRoot = join(__dirname, '../../');

// Imported instance of .env variables
const env = {
    corsOrigin: (!process.env.CORS_ORIGIN || process.env.CORS_ORIGIN === 'false' || process.env.CORS_ORIGIN === 'null') ?
        false : process.env.CORS_ORIGIN, // Sets corsOrigin to false (disables cors) if requested / none provided
    port: process.env.port || 3000, // uses the port in .env or defaults to 3000
    rootLocation: projectRoot,
}

export default env;