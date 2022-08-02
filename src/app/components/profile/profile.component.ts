import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
//import { MessageService } from 'primeng/api';
import { ChangePassword } from 'src/app/models/change-password.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  display: boolean = false;
  changePassword: ChangePassword = {
    email: '',
    password: '',
    newPassword: '',
  };
  submitted = false;
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    //private messageService: MessageService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    console.log('current user', this.currentUser);
  }

  onOkDeleteAccount() {
    if (confirm('Are you sure that you want to delete your account?')) {
      this.authService.delete().subscribe(() => {
        this.alertService.addSuccess(
          'Service Message',
          'Your account has been deleted'
        );

        this.storageService.clean();

        this.router.navigate(['cars']).then(() => {
          window.location.reload();
        });
      });
    }
  }

  showDialog() {
    this.display = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (!this.form.invalid) {
      this.display = false;

      this.form.value.email = this.currentUser.email;
      this.authService.changePassword(this.form.value).subscribe(() => {
        this.alertService.addSuccess(
          'Service Message',
          'Password has been changed. Please relogin'
        );
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Service Message',
        //   detail: 'Password has been changed. Please relogin',
        // });

        this.storageService.clean();
        this.router.navigate(['login']);
      });
    }
  }
}
