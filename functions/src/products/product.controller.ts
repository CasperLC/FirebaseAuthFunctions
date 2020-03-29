import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {Change, EventContext} from "firebase-functions/lib/cloud-functions";

export interface ProductController {
    writtenProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;
    createProduct(snap: DocumentSnapshot, context: EventContext): Promise<any>;
    purchaseProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<any>;
}
