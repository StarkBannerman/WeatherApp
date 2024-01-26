import express, { json, response, urlencoded } from "express";
import { fileURLToPath } from "url";
import * as path from "path";
import { join, dirname } from "path";
import currentWeather from "./Routes/currentWeather.js";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  res.redirect("https://aruncodes.site");
});

app.use(express.static(join(__dirname, "public")));
const client = path.resolve(__dirname, "../client/build");
app.use(express.static(client));

app.get("/client/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/currentWeather", currentWeather);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
