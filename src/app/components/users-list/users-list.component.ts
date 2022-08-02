import { Component, OnInit } from '@angular/core';
import { ResponseWithUsers } from 'src/app/models/response-with-users.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Table } from 'primeng/table';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  response?: ResponseWithUsers;
  users: User[] = [];
  selectedUser: User;
  deletedMenu = [{ option: 'true' }, { option: 'false' }];
  pageSize: number = 0;
  pageNumber: number = 0;
  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAll().subscribe((x) => {
      this.response = x;
      this.users = this.response?.results;
      console.log('users', this.users);
    });
  }

  editUsers(): void {
    this.userService.editUsers(this.users).subscribe({
      next: (data) => {
        console.log(data);
        this.alertService.addSuccess('Service Message', data.message);
        this.retrieveUsers();
      },
    });
  }

  onBanChange(event: any, id: string): void {
    console.log('event', event);
    console.log('id', id);
  }

  onPageChange(event: any) {
    console.log('event', event);
    this.pageSize = event.rows;
    this.pageNumber = event.page + 1;
    this.userService
      .getByPage(this.pageNumber, this.pageSize)
      .subscribe((data) => {
        this.response = data;
        this.users = this.response?.results;
      });
  }
}
