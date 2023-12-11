import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  // "_router" is used to navigate to dashboard after login page was successfull.
  constructor(private _loginService: LoginService, private _router:Router){}

  login(){
    console.log(this.loginForm);

    this._loginService.login(this.loginForm.value).subscribe(
      (data:any)=>{
        alert('Login Successfully');
        // Go to dashboard
        this._router.navigateByUrl('/dashboard');
        // Store
        localStorage.setItem("token",data.token);
      },
      (err:any)=>{
        alert('Invalid credentials');
      }
    )
  }
}
