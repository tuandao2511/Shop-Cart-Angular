import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/model/UserResponse';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private userService: UserService) { 

  }

  currentUser: UserResponse;

  ngOnInit(): void {
    this.userService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    })
  }

  logout() {
    this.userService.logout();
  }

}
