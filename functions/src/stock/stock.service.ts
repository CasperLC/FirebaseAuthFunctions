import {StockRepository} from "./stock.repository";
import {Stock} from "../models/stock";

export class StockService {
    constructor(private stockRepo: StockRepository) {}

    createStock(stock: Stock): Stock {
        return this.stockRepo.createStock(stock);
    }

    thisIsAFunction(stock: Stock): Stock {
        console.log('I just called this function which JEST is telling me isnt a function')
        return this.stockRepo.createStock(stock);
    }
}
