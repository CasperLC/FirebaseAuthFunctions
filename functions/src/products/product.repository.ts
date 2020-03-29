import {Product} from "../models/product";

export interface ProductRepository{
    setProduct(product: Product): Promise<any>;
    deleteProduct(productId: string): Promise<any>;
}
