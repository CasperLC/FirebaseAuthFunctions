import {StockController} from "./stock.controller";
import {Stock} from "../models/stock";
import {StockService} from "./stock.service";

export class StockControllerFirebase implements StockController{
    constructor(private stockService: StockService){}

    createStock(stock: Stock): Stock {
        return this.stockService.createStock(stock);
    }


}
