import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors({ origin: 'https://blog-app-client-ruby.vercel.app', credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

app.get("/", (req, res) => {
    res.send(`hello`)
})

const PORT = process.env.PORT || 8000;

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => app.listen(PORT))
    .then(() =>
        console.log(`Connected To Database and listening at PORT ${PORT}`)
    )
    .catch((err) => console.log(err));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://blog-app-client-ruby.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});