import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cars-angular';
  private roles: string[] = [];
  isLoggedIn = false;
  showUsers = false;
  username?: string;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.username = user.firstName;
      this.showUsers = ['SuperAdmin', 'Admin'].some((r) =>
        this.roles.includes(r)
      );
    }
  }

  logout(): void {
    this.storageService.clean();

    // this.authService.logout().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.storageService.clean();
    //   },
    //   error: (err) => {
    //     console.log(err);g
    //   },
    // });

    window.location.reload();
  }
}
