import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup , FormBuilder} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {
  productForm: FormGroup;

  constructor(
    private aptService: ProductService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      product: [''],
      name: [''],
      description: [''],
      value: [''],
    })
  }

  formSubmit(){
    if(!this.productForm.valid){
      console.log("to aqui")
      return false;
    }else{
      console.log(this.productForm);
      this.aptService.createProducts(this.productForm.value).then(res => {
        console.log(res);        
        this.productForm.reset();
        this.router.navigate(['/home']);
      })
      
    }
  }

}
