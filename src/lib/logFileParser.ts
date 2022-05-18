import { FileParser } from "./fileParser";
import { ParseResult } from "../models/parseResult";

export class LogFileParser implements FileParser {
    parse(content: string): ParseResult {
        return content
            .split("\n")
            .filter(line => line.length > 0)
            .map(line => line.split(" - ").map(token => token.trim()))
            .filter(([, logLevel,]) => logLevel === "error" || logLevel === "warn")
            .map(([timestamp, logLevel, message]) => {
                const { err, transactionId } = JSON.parse(message)
                return { timestamp, logLevel, transactionId, err }
            })
    }
}