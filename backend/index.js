import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import db from "./src/db.js";
import { fetch } from "undici";
import ticker from "./src/router/tickers.js";
import cors from "cors";
config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/tickers", ticker);

app.options("/", (_, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).send();
});
app.get("/", (_, res) => {
    res.status(200).json({
        message: "API online",
    });
});

app.listen(3000, async () => {
    // const col = db.collection("tickers");
    // // // console.log(await col.countDocuments())
    // if (!(await col.countDocuments())) {
    //     const response = await fetch(process.env.api);
    //     const tickers = await response.json();

    //     // getting first 10 tickers from tickers object
    //     const first10Tickers = Object.keys(tickers)
    //         .slice(0, 10)
    //         .map((key) => {
    //             return {
    //                 key: key,
    //                 name: tickers[key].name,
    //                 last: tickers[key].last,
    //                 buy: tickers[key].buy,
    //                 sell: tickers[key].sell,
    //                 volume: tickers[key].volume,
    //                 base_unit: tickers[key].base_unit,
    //             };
    //         });

    //     // inserting tickers into db
    //     await col.insertMany(first10Tickers);
    // }
    console.log("Server running on port 3000");
});
