import { Router } from "express";
import db from "../db.js";

const router = Router();

router.options("/", (_, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Credentials", true);
    res.status(204).send();
});

router.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const col = db.collection("tickers");
    const firstNTickers = await col.find().limit(limit).toArray();
    const resarr = [];
    firstNTickers.forEach((ticker, y) => {
        const FiveMins = parseFloat(Math.random().toFixed(2));
        const OneHour = parseFloat(
            (parseFloat(Math.random().toFixed(2)) + FiveMins).toFixed(2),
        );
        const OneDay = parseFloat(
            (parseFloat(9.9 * Math.random().toFixed(2)) + OneHour).toFixed(2),
        );
        const OneWeek = parseFloat(
            (parseFloat(9.9 * Math.random().toFixed(2)) + OneDay).toFixed(2),
        );
        const random = [
            -Math.abs(
                ((parseInt(ticker.buy) - parseInt(ticker.sell)) / 2) *
                    (Math.random() * 1.25),
            ),
            Math.abs(
                ((parseInt(ticker.buy) - parseInt(ticker.sell)) / 2) *
                    (Math.random() * 1.25),
            ),
        ];
        resarr.push({
            data: ticker,
            avg: parseInt(
                parseInt(ticker.last) + random[Math.round(Math.random())],
            ),
            FiveMins: FiveMins,
            OneHour: OneHour,
            OneDay: OneDay,
            OneWeek: OneWeek,
        });
    });
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Credentials", true);

    res.status(200).json({
        status: "success",
        data: resarr,
    });
});

router.post("/", async (req, res) => {
    const col = db.collection("tickers");

    const ticker = await col.findOne({
        key: req.body.ticker.toLowerCase() + "inr",
    });
    // console.log(req.body.ticker);
    const FiveMins = parseFloat(Math.random().toFixed(2));
    const OneHour = parseFloat(
        (parseFloat(Math.random().toFixed(2)) + FiveMins).toFixed(2),
    );
    const OneDay = parseFloat(
        (parseFloat(9.9 * Math.random().toFixed(2)) + OneHour).toFixed(2),
    );
    const OneWeek = parseFloat(
        (parseFloat(9.9 * Math.random().toFixed(2)) + OneDay).toFixed(2),
    );
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Credentials", true);
    const random = [
        -Math.abs(
            ((parseInt(ticker.buy) - parseInt(ticker.sell)) / 2) *
                (Math.random() * 1.25),
        ),
        Math.abs(
            ((parseInt(ticker.buy) - parseInt(ticker.sell)) / 2) *
                (Math.random() * 1.25),
        ),
    ];
    res.status(200).json({
        status: "success",
        data: ticker,
        avg: parseInt(
            parseInt(ticker.last) + random[Math.round(Math.random())],
        ),
        FiveMins,
        OneHour,
        OneDay,
        OneWeek,
    });
});

router.get("/names", async (req, res) => {
    const col = db.collection("tickers");
    const tickers = await col.find().toArray();
    const names = tickers.map((ticker) => ticker.base_unit);
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Credentials", true);

    res.status(200).json({
        status: "success",
        data: names,
    });
});

export default router;
