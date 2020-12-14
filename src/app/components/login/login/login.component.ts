import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserResponse } from 'src/app/model/UserResponse';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  userLoginData: any = {
    username: '',
    password: '',
    remembered: false
  }
  isDisable: boolean = false;
  sub: Subscription;
  isLoginError: boolean = false;
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
  }

  onSubmit() {
    this.sub = this.userService.login(this.userLoginData).subscribe(userResponse => {      
      if(userResponse!=null) {
        console.log('da login');
        
        this.router.navigateByUrl('/');
      } else {
        this.isLoginError = true;
      }
    },err => {
      this.isLoginError = true;
    })
  }

  fillLoginFields(u, p) {
    this.userLoginData.username = u;
    this.userLoginData.password = p;
    this.onSubmit();
  }

  ngOnDestroy(): void {
    if(this.sub!=null) this.sub.unsubscribe();
  }
}
