import {Stock} from "../models/stock";

export interface StockController {
    createStock(stock: Stock): Stock;
}
