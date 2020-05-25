import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from 'src/app/interfaces/user';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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
  public authService: AuthService;


  constructor(
    public keyboard : Keyboard,
    private loadingControl: LoadingController,
    private toastCrtl: ToastController
    
    ) { }

  ngOnInit() { }
  segmentChanged(event: any){
    if(event.detail.value === 'login'){
      this.slides.slidePrev();
    }else{
      this.slides.slideNext();
    }
  }
  login(){

  }
  async register() {
    await this.presentLoading();
    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      console.log( this.presentToast(error.message));
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
    const toast = await this.toastCrtl.create({ message, duration: 2000 });
    toast.present();
  }
}

