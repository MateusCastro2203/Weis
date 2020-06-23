import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { Product } from '../interfaces/product';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Identifiers } from '@angular/compiler';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private produtsColection: AngularFirestoreCollection<Product>
  
  constructor(private afa: AngularFirestore) {
    this.produtsColection = this.afa.collection<Product>('Products');
  }

  getProducts() {
    return this.produtsColection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ...data};
        })
      })
    )
  }

  getProductId(id: string) {

  }

  addProduct(product: Product) {

  }

  updateProduct(id: string, product: Product) {

  }

  deleteProduct(id: string) {

  }



}
