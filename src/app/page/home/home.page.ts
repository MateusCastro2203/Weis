import { Component, OnInit, Input } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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
  private products = new Array<Product>();
  private productsSubscription: Subscription;
  
  constructor(
    private geolocation: Geolocation,
    private productsService : ProductService
  ) { 
    this.productsSubscription = this.productsService.getProducts().subscribe(data =>{
      this.products = data;
    })
  }
    
  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp)=>{
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
    }).catch((error)=>{
      console.log('Error para pegar a localização', error);
    });
  }

  ngDestroy(){
    this.productsSubscription.unsubscribe();
  }

}
