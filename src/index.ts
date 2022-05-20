import express from "express"
import multer from "multer"
import { LogFileParser } from "./lib/logFileParser";

const port = process.env.PORT || 3000;

const app = express()
const upload = multer()

const parser = new LogFileParser({delimiter: " - ", logLevels: ["error", "warn"]})

app.get("/", (req, res) => {
    res.json({ message: "Hello world" })
})

app.post("/api/parse", upload.single("file"), (req, res) => {
    const text = req.file?.buffer.toString() || ""
    const parsedText = parser.parse(text)
    res.json({success: true, data: parsedText})
})

app.listen(port, () => console.log("Listening"))