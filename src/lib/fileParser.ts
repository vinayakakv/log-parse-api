import { ParseResult } from "../models/parseResult"

export interface FileParser {
    parse(content: string): ParseResult
}