import express from "express";
import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from "url";
import dbconnect from "./backend/config/dbConnect.js";
import userRoute from "./backend/routes/userRoute.js"
import applicationRoute from "./backend/routes/applicationRoute.js"
import cookieParser from "cookie-parser";
import errorMiddleware from "./backend/middleware/errorMiddleware.js";

let app = express();
const MODE = process.env.NODE_ENV;
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));

    dotenv.config({ path: "./backend/config/.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dbconnect();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute)
app.use("/api/v1/application", applicationRoute)
app.use(errorMiddleware)

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "/backend/build/")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./backend/build/index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} in ${MODE} Mode`);
});

