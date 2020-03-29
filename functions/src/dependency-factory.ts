import {ProductController} from "./products/product.controller";
import {ProductRepository} from "./products/product.repository";
import {ProductRepositoryFirebase} from "./products/product.repository.firebase";
import {ProductService} from "./products/product.service";
import {ProductControllerFirebase} from "./products/product.controller.firebase";
import {StockController} from "./stock/stock.controller";
import {StockRepository} from "./stock/stock.repository";
import {StockRepositoryFirebase} from "./stock/stock.repository.firebase";
import {StockService} from "./stock/stock.service";
import {StockControllerFirebase} from "./stock/stock.controller.firebase";
import {OrdersRepository} from "./orders/orders.repository";
import {OrdersRepositoryFirebase} from "./orders/orders.repository.firebase";

export class DependencyFactory {
    getProductController(): ProductController {
        const repo: ProductRepository = new ProductRepositoryFirebase();
        const repoStock: StockRepository = new StockRepositoryFirebase();
        const repoOrder: OrdersRepository = new OrdersRepositoryFirebase();
        const service: ProductService = new ProductService(repo, repoStock, repoOrder);
        return new ProductControllerFirebase(service);
    }

    getStockController(): StockController{
        const repo: StockRepository = new StockRepositoryFirebase();
        const service: StockService = new StockService(repo);
        return new StockControllerFirebase(service);
    }
}
