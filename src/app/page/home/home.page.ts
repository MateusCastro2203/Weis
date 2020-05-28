import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private geolocation: Geolocation
  ) { }
    
  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp)=>{
      let latitude = resp.coords.latitude;
      let longitude = resp.coords.longitude;
    }).catch((error)=>{
      console.log('Error para pegar a localização', error);
    });





  }

}
