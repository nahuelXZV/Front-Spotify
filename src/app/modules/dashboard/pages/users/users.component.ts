import { Component, OnInit } from '@angular/core';
import { IUser } from '@modules/auth/interfaces/auth.interface';
import { UserService } from '@modules/dashboard/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: IUser[] = []

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users
      })
  }

}
