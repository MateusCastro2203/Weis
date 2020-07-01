import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.sideMenu();

  }
  ngOnInit() {
    this.login();
  }
  login(){
    console.log(this.router.url);  
    if (window.location.href != 'http://localhost:8100/login') {
      console.log('oi');
      let menu = document.getElementById('menu');
      menu.classList.remove('hidde');
    }
  }

  sideMenu() {
    this.navigate = [
      {
        title: "Home",
        url: "/home",
        icon: "home"
      },
      {
        title: "Perfil",
        url: "/user",
        icon: "person"
      },
      {
        title: "Adiconar Produto",
        url: "/produto",
        icon: "add-circle"
      }
    ]
  }

}
