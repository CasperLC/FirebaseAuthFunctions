import {OrdersRepository} from "./orders.repository";
import * as admin from "firebase-admin";
import {Product} from "../models/product";
import {Order} from "../models/order";

export class OrdersRepositoryFirebase implements OrdersRepository{
    orderPath = 'orders';

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }

    async create(product: Product, amount: number): Promise<Order> {
        const order: Order = {amount: amount, pId: product.pId, productName: product.productName};
        await this.db().collection(`${this.orderPath}`).add(order);
        return Promise.resolve(order);
    }
}
