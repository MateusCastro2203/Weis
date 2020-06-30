import { Component, OnInit, Input } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { Product } from '../../interfaces/product';
import { from, Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private productsSubscription: Subscription;
  product = [];

  constructor(
    private prodService: ProductService
  ) { 
  }
    
  ngOnInit() {
    this.fetchProduct();
    let prodRes = this.prodService.getProductList();
    prodRes.snapshotChanges().subscribe(res => {
      this.product = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.product.push(a as Product);
      })
    })
  }

  fetchProduct(){
    this.prodService.getProductList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  deleteBooking(id){
    console.log(id);
    if(window.confirm('Você realmente deseja deletar?')){
      this.prodService.deleteProduct(id)
    }
  }
  
  ngDestroy(){
    this.productsSubscription.unsubscribe();
  }

}
