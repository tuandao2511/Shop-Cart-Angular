import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  isDisable: boolean = false;
  isError : boolean = false;
  constructor(private userService: UserService, private router: Router) { 

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.register(this.user).subscribe( 
      user => {
        this.router.navigateByUrl('/login');
      }, err => {
        this.isError = true;
      }
    )
  }
}
