import {StockRepository} from "./stock.repository";
import {Stock} from "../models/stock";
import * as admin from "firebase-admin";
import {Product} from "../models/product";

export class StockRepositoryFirebase implements StockRepository {
    stockPath = 'stock';
    createStock(stock: Stock): Stock {
        //this.db().collection(`${this.stockPath}`).add(stock);
        return stock;
    }

    setStock(stock: Stock): Promise<any> {
        return this.db().doc(`${this.stockPath}/${stock.stockId}`).set(
            stock
        );
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }

    async create(product: Product, amount: number): Promise<Stock> {
        const stock: Stock = {pId: product.pId, productName: product.productName, inStock: amount};
        await this.db().collection(`${this.stockPath}`).add(stock);
        return Promise.resolve(stock);
    }

    async getStock(product: Product): Promise<Stock>{
        let stock: Stock = {inStock: 1, productName: 'failed', pId: ''};
        const stockRef = this.db().collection(`${this.stockPath}`);
        const query = stockRef.where('pId', '==', product.pId).where('productName', '==', product.productName);
/*
        await query.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                stock = doc.data() as Stock;
            });
        });

 */
        await query.get().then(querySnap => {
            querySnap.forEach(doc => {
                stock = doc.data() as Stock;
                stock.stockId = doc.id;
            });
        });

        return Promise.resolve(stock);


    }
}
