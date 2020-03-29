import {ProductController} from "./product.controller";
import {Change} from "firebase-functions/lib/cloud-functions";
import {EventContext} from 'firebase-functions';
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {Product} from "../models/product";
import {ProductService} from "./product.service";

export class ProductControllerFirebase implements ProductController{
    constructor(private productService: ProductService){}

    writtenProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
        const productBefore = snap.before.data() as Product;
        const productAfter = snap.after.data() as Product;
        return this.productService.writeProduct(context.params.prodId, productBefore, productAfter);
    }

    createProduct(snap: DocumentSnapshot, context: EventContext): Promise<any> {
        const newProduct = snap.data() as Product;
        return this.productService.createProduct(newProduct, context.params.prodId);
    }

    purchaseProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<any> {
        const productBought = snap.after.data() as Product;
        return this.productService.purchaseProduct(productBought, context.params.prodId);
    }

}
