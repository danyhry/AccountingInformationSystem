import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Base} from "../../services/destroy.service";
import {takeUntil} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../modules/auth/validators/must-match.validator";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends Base implements OnInit {

  user!: User | undefined;

  editForm!: FormGroup;

  changePasswordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    renewPassword: ['', [Validators.required]],
  }, {
    validator: MustMatch("newPassword", "renewPassword")
  });


  constructor(private userService: UserService,
              private fb: FormBuilder,
              private notificationService: NotificationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', []]//Validators.email, Validators.required
    });

    this.userService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        console.log(this.user);

        this.editForm.setValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email
        })
      });

    //
    // setTimeout(() => {
    //   this._editForm = this.fb.group({
    //     firstName: [this.user?.firstName, [Validators.required]],
    //     lastName: [this.user?.lastName, [Validators.required]],
    //     email: [this.user?.email, []]//Validators.email, Validators.required
    //   });
    // }, 500);
  }

  _onSubmitPassword() {
    if (this.changePasswordForm.valid) {
      const data = {
        currentPassword: this.changePasswordForm.value.currentPassword,
        newPassword: this.changePasswordForm.value.newPassword,
        renewPassword: this.changePasswordForm.value.renewPassword
      }

      // @ts-ignore
      this.userService.updatePassword(data, this.user.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: () => {
              this.notificationService.showSuccessMessage(`Пароль успішно змінено.`);
            },
            error: err => {
              this.notificationService.showErrorMessage(err.error.message);
            }
          }
        );

    } else {
      this.notificationService.showErrorMessage("Форма невалідна");
    }
  }

  _onSubmitEditProfile() {
    if (this.editForm.valid) {
      let data = {
        firstName: this.editForm.value.firstName,
        lastName: this.editForm.value.lastName,
        email: this.editForm.value.email,
        password: this.user?.password,
        role: this.user?.role,
      }
      this.userService
        // @ts-ignore
        .editUser(this.user.id, data)
        .pipe(takeUntil(this.destroy$))
        .subscribe((user: User) => {
          console.log(user);
          this.user = user;
          this.userService.setUser(user);
          this.notificationService.showSuccessMessage(`Інформацію успішно оновлено.`);
        });
    } else {
      this.notificationService.showErrorMessage("Форма невалідна!");
    }
  }

}
