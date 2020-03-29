import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DependencyFactory} from "./dependency-factory";

const difa = new DependencyFactory();

admin.initializeApp();

 // Start writing Firebase Functions
 // https://firebase.google.com/docs/functions/typescript


exports.productWritten = functions.firestore.document('products/{prodId}')
    .onUpdate((snap, context) => {
        //return difa.getProductController().writtenProduct(snap, context);
        return difa.getProductController().purchaseProduct(snap, context);
    });

exports.createProduct = functions.firestore.document('products/{prodId}')
    .onCreate((snap, context) => {
        return difa.getProductController().createProduct(snap, context);
    });

/*
 exports.products = functions.https.onRequest((request, response) => {
  admin.firestore().collection('products')
      .get().then(prod => {
       console.log(prod);
       response.send("Hello from Firebase!");
  }).catch(error => {console.log(error)});
 });

 */

