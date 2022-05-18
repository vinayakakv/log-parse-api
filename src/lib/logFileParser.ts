import { FileParser } from "./fileParser";
import { ParseResult } from "../models/parseResult";

export class LogFileParser implements FileParser {
    private delimiter: string
    private logLevels: string[]

    constructor(args: { delimiter: string, logLevels: string[] }) {
        this.delimiter = args.delimiter
        this.logLevels = args.logLevels
    }

    parse(content: string): ParseResult {
        return content
            .split("\n")
            .filter(line => line.length > 0)
            .map(line => line.split(this.delimiter).map(token => token.trim()))
            .filter(([, logLevel,]) => this.logLevels.includes(logLevel))
            .map(([timestamp, logLevel, message]) => {
                const { err, transactionId } = JSON.parse(message)
                return { timestamp, logLevel, transactionId, err }
            })
    }
}