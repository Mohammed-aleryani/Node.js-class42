import express from "express";
import grabTemp from "./controller/grabTemp.js"
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static('public'))

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", grabTemp);

export default app;