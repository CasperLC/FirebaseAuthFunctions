import {Stock} from "../models/stock";
import {Product} from "../models/product";

export interface StockRepository {
    createStock(stock: Stock): Stock;
    create(product: Product, amount: number): Promise<Stock>;
    getStock(product: Product): Promise<Stock>;
    setStock(stock: Stock): Promise<any>;
}
