import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";
import {Base} from "../../../../services/destroy.service";
import {takeUntil} from "rxjs";
import {User} from "../../../../models/user";
import {RecoveryFormComponent} from "../recovery/recovery.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../../../services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Base implements OnInit {

  showPassword!: boolean;

  showErrors!: boolean;

  user!: User;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    remember: [false]
  });

  constructor(public authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private modal: NgbModal,
              private config: NgbModalConfig,
              private dialog: MatDialog,
              private notificationService: NotificationService
  ) {
    super();
    config.backdrop = false;
  }

  ngOnInit(): void {
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.showErrors = false);
  }

  _onSubmit(): void {
    if (true) { //this.loginForm.valid
      const data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        remember: this.loginForm.value.remember
      };
      localStorage.clear();
      sessionStorage.clear();

      this.authService.login(data, data.remember)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/dashboard');
          },
          error: (response) => {
            this.showErrors = true;
            this.notificationService.showErrorMessage(response);
          }
        });
    }
  }

  openRecovery() {
    this.dialog.open(RecoveryFormComponent, {
      width: '35%',
    });
  }
}
