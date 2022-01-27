import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  loginForm:FormGroup
//  username = '';
//  password = new FormControl('');
//  username = '';
//  password = new FormControl('');
//  user: any;

  constructor(public router:Router, private FB:FormBuilder, private loginservice:LoginService, public toastController:ToastController) {}

  ngOnInit() {
    this.loginForm=this.FB.group({
      email:['',Validators.required],
      password:['',Validators.required],

    })
  }

  login(){
    console.log(this.loginForm.value)
    if(this.loginForm.valid){
      this.loginservice.loginRequest(this.loginForm.value).subscribe((rest:any)=>{
        console.log(rest)
        if(rest.data){
          this.router.navigate(['/dashboard'])
          localStorage.setItem('user',JSON.stringify(rest.data))
        }
        else if(rest.error){
          console.log(rest.error)

        }
      })
    }
  }



  async presentToast(message) {
    const toast = await this.toastController.create({
      message: 'Login Successfully.',
      duration: 2000,
    });
    toast.present();
  }

  RedirectToOtherPage1()
  {
    this.router.navigateByUrl('/signup');
  }


}
