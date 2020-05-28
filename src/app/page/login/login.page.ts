import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;
  

  constructor(
    private authService: AuthService,
    public keyboard : Keyboard,
    private loadingControl: LoadingController,
    private toastCrtl: ToastController,
    private router : Router
    ) { }

  ngOnInit() { }
  segmentChanged(event: any){
    if(event.detail.value === 'login'){
      this.slides.slidePrev();
    }else{
      this.slides.slideNext();
    }
  }
  async login(){
    await this.presentLoading();
    try {
      await this.authService.login(this.userLogin);
      console.log("loguei");
      this.router.navigateByUrl('/home');
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }
  async register() {
    await this.presentLoading();
    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingControl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    
    const toast = await this.toastCrtl.create({ message, duration: 6000 });
    toast.present();
  }
}

