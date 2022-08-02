import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
    code: null,
  };
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form.code = this.route.snapshot.params['code'];
  }

  onSubmit(): void {
    this.authService.resetPassword(this.form).subscribe({
      next: (data) => {
        console.log(data);
        this.alertService.addSuccess('Service Message', data.message);
      },
    });
  }
}
