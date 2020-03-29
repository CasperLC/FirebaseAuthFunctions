import {ProductRepository} from "./product.repository";
import {Product} from "../models/product";
import * as admin from "firebase-admin";

export class ProductRepositoryFirebase implements ProductRepository{
    productsPath = 'products';
    async setProduct(product: Product): Promise<any> {
        await this.db().doc(`${this.productsPath}/${product.pId}`).set(
            product
        );
        return Promise.resolve(product);
    }

    deleteProduct(productId: string): Promise<any> {
        return this.db().doc(`${this.productsPath}/${productId}`).delete();
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }

}
