import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Base} from "../../../../services/destroy.service";
import {takeUntil} from "rxjs";
import {User} from "../../../../models/user";
import {AuthResponse} from "../../../../models/auth/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class LoginComponent extends Base implements OnInit {

  _showPassword!: boolean;

  _showErrors!: boolean;

  user!: User;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    remember: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              public authService: AuthService,
              private userService: UserService,
              private modal: NgbModal,
              private config: NgbModalConfig,
  ) {
    super();
    config.backdrop = false;
  }

  ngOnInit(): void {
    // this.getUser();
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this._showErrors = false);
  }

  _onSubmit(): void {
    if (true) { //this.loginForm.valid
      const data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        remember: this.loginForm.value.remember
      };
      localStorage.removeItem('access_token');
      sessionStorage.removeItem('access_token');
      this.authService.login(data, data.remember)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (userData: AuthResponse) => {
            data.remember ? localStorage.setItem('access_token', userData.token)
              : sessionStorage.setItem('access_token', userData.token);
            this.router.navigateByUrl('/dashboard');
          },
          error: () => {
            this._showErrors = true;
          }
        });
    }
  }

  _onEyeClick() {
    this._showPassword = !this._showPassword;
  }

}
