import {ProductRepository} from "./product.repository";
import {Product} from "../models/product";
import {StockRepository} from "../stock/stock.repository";
import {Stock} from "../models/stock";
import {OrdersRepository} from "../orders/orders.repository";
//import {Stock} from "../models/stock";

export class ProductService {
    constructor(private productRepo: ProductRepository,
                private stockRepo: StockRepository,
                private orderRepo: OrdersRepository) {}

    async createProduct(product: Product, productId: string): Promise<Product>{
        product.pId = productId;
        const stock: Stock = await this.stockRepo.create(product, 5);
        console.log(stock);
        return Promise.resolve(product);
    }

    async purchaseProduct(product: Product, productId: string): Promise<any> {
        product.pId = productId;
        const stock: Stock = await this.stockRepo.getStock(product);
        stock.inStock = stock.inStock - 1;
        await this.stockRepo.setStock(stock);
        if(stock){
            await this.orderRepo.create(product, 1);
        }
        return Promise.resolve(product);
    }

    writeProduct(productId: string, productBefore: Product, productAfter: Product): Promise<void> {
        const times = productBefore.timesPurchased + 1;
        if(productAfter) {
            return this.productRepo.setProduct({
                pId: productId,
                productName: productAfter.productName,
                price: productAfter.price,
                timesPurchased: times
            });
        } else {
            return this.productRepo.deleteProduct(productId)
                .catch(error => {console.log(error)});
        }
    }

    buy(product: Product): Product {
        if(product) {
            product.timesPurchased = product.timesPurchased +1;
            return product;
        }
        return undefined as any;
    }

}
