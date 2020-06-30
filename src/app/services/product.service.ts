import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { Product } from '../interfaces/product';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  ProductListRef: AngularFireList <any>;
  ProductRef: AngularFireObject <any>;
  constructor(private db: AngularFireDatabase) {
  }

  //Create 
  createProducts(product: Product){
    return this.ProductListRef.push({
      produto: product.produto,
      name: product.name,
      description: product.description,
      value: product.value
    })
  }
  // Get single 
  getProductById(id:string){
    this.ProductListRef = this.db.list('/produto/' +id);
    return this.ProductListRef;
  }

  //Get List

  getProductList(){
    this.ProductListRef = this.db.list('/produto');
    return this.ProductListRef; 
  }

  //Update
  updateProduct(id, prod: Product){
    return this.ProductRef.update({
      product: prod.produto,
      name: prod.name,
      description: prod.description,
      value: prod.value
    })
  }

  //Delete
  deleteProduct(id: string){
    this.ProductRef = this.db.object('/produto' + id);
    this.ProductRef.remove();
  }
}
