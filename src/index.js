import cors from "cors";
import http from "http";
import express from "express";
import env from "./config/env.js";
import {importPersonsData} from "./services/dataSeedService.js";
import personsRoutes from "./routes/personsRoutes.js";

const app = express();

const corsOptions = {
    origin: env.corsOrigin,
}

app.use(cors(corsOptions));

// Enables support for json and url encoded body parsing for future scenarios where POST requests are implemented
app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));

// Routes
app.use('/persons', personsRoutes);

const server = http.createServer(app);

(async () => {
    try {
        await importPersonsData();
        server.listen(env.port, () => {
            console.log(`Server is running on port ${env.port}`);
        });
    } catch (error) {
        console.log(`Error starting server`);
        throw error; // If there is an error starting, running the server is useless.
    }
})();

