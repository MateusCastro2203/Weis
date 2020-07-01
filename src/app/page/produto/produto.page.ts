import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup , FormBuilder} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {
  productForm: FormGroup;
  public dowloadUrl: Observable<string>;
  public img: string;

  constructor(
    private aptService: ProductService,
    private router: Router,
    public fb: FormBuilder,
    private camera: Camera,
    private plataform: Platform,
    private file: File,
    private affStorage: AngularFireStorage,
    private app : AppComponent
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      produto: [''],
      name: [''],
      description: [''],
      value: [''],
      imgUrl:[this.dowloadUrl],
      phone:['']
    });
    this.app.login();
  }

  formSubmit(){
    if(!this.productForm.valid){
      console.log("to aqui")
      return false;
    }else{
      this.aptService.createProducts(this.productForm.value).then(res => {
        console.log(res);     
        this.productForm.reset();
        this.router.navigate(['./home']); 
      })
       .catch(error => console.log(error));
    }
  }
  async openGalery(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
    }

    try{
      const fileUri: string = await this.camera.getPicture(options);

      let file: string;

      if(this.plataform.is('ios')){
        file = fileUri.split('/').pop();
      }else{
        file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf('?'))
      }
      const path: string = fileUri.substring(0,fileUri.lastIndexOf('/'));

      const buuffer : ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      const blob: Blob = new Blob([buuffer], {type: 'image/jpeg'});
      this.img = path;
      this.uploadPicture(blob);
      return this.img;
    }catch(error){
      console.log(error);
    }
  }

  uploadPicture(blob: Blob){
    const ref = this.affStorage.ref('img/'+this.img+'.jpg');
    const task = ref.put(blob);

    task.snapshotChanges().pipe(
      finalize(()=> this.dowloadUrl = ref.getDownloadURL())
    )
  }

}
