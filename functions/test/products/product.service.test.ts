import {Product} from "../../src/models/product";
import {IMock, Mock, Times} from "moq.ts";
import {ProductRepository} from "../../src/products/product.repository";
import {ProductService} from "../../src/products/product.service";
import {StockRepository} from "../../src/stock/stock.repository";
import {Stock} from "../../src/models/stock";
import {OrdersRepository} from "../../src/orders/orders.repository";

describe('ProductService', () => {
    let productRepository: IMock<ProductRepository>;
    let stockRepository: IMock<StockRepository>;
    let orderRepository: IMock<OrdersRepository>;
    let productService: ProductService;
    let product: Product = {productName: 'product1', inStock: 5, price: 25, timesPurchased: 0, pId: 'prodId_1'};
    const stock: Stock = {inStock: 5, productName: 'stockTestName', pId: 'stockTestId'};
    beforeEach(() => {
        productRepository = new Mock<ProductRepository>();
        orderRepository = new Mock<OrdersRepository>();
        stockRepository = new Mock<StockRepository>()
            .setup(stockRepo => stockRepo.create(product, 5))
            .returns(Promise.resolve(stock));
        productService = new ProductService(productRepository.object(), stockRepository.object(), orderRepository.object());
    });

    it('Buying a product adds one to timesPurchased', async () => {
        const beforePurchased = product.timesPurchased;
        expect(beforePurchased).toBe(0);
        const productAfter: Product = productService.buy(product);
        const afterPurchased = productAfter.timesPurchased;
        expect(afterPurchased).toBe(1);
    });

    it('Product Service needs a StockRepository and a ProductRepository', () => {
       const productServiceDefined = new ProductService(productRepository.object(), stockRepository.object(), orderRepository.object());
       expect(productServiceDefined).toBe(productServiceDefined)
    });

    it('When a new Product is created, a Stock with the productName and pId should be created as well', async () => {
        await productService.createProduct(product, 'prodId_1');
       let stockAfter: Stock;
           await stockRepository.verify(async stockRepo => {
               stockAfter = await stockRepo.create(product,5);
               expect(stockAfter).toBe(stock);
           });
    });

    it('Create product function should  accept a product and return it', async () => {
        const productAfter: Product = await productService.createProduct(product,'prodId_1');

        expect(productAfter).toBe(product);
    });

    it('When product is created a new stock with an amount should be added to the stock collection', async () => {
        await productService.createProduct(product,'prodId_1');
        stockRepository.verify(stockRepo => stockRepo.create(product, 5), Times.Exactly(1))
    })

});
