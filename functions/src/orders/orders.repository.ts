import {Product} from "../models/product";
import {Order} from "../models/order";

export interface OrdersRepository  {
    create(product: Product, amount: number): Promise<Order>;
}
