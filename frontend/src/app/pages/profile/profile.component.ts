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

  _editForm!: FormGroup;

  _changePasswordForm = this.fb.group({
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
    this.userService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
        this.user = user;
      });
    this._editForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', []]//Validators.email, Validators.required
    });
    setTimeout(() => {
      this._editForm = this.fb.group({
        firstName: [this.user?.firstName, [Validators.required]],
        lastName: [this.user?.lastName, [Validators.required]],
        email: [this.user?.email, []]//Validators.email, Validators.required
      });
    }, 500);
  }

  _onSubmitPassword() {
    console.log(this._changePasswordForm);
    if (this._changePasswordForm.valid) {
      const data = {
        currentPassword: this._changePasswordForm.value.currentPassword,
        newPassword: this._changePasswordForm.value.newPassword,
        renewPassword: this._changePasswordForm.value.renewPassword
      }

      // @ts-ignore
      this.userService.updatePassword(data, this.user.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: () => {
              this.notificationService.showSuccessMessage(`Password was successfully changed.`);
            },
            error: err => {
              this.notificationService.showErrorMessage(err.error.message);
            }
          }
        );

    } else {
      this.notificationService.showErrorMessage("Form is not valid");
    }
  }

  _onSubmitEditProfile() {
    console.log("onSubmit edit profile")
    console.log(this._editForm);
    if (this._editForm.valid) {
      let data = {
        firstName: this._editForm.value.firstName,
        lastName: this._editForm.value.lastName,
        email: this._editForm.value.email,
        password: this.user?.password,
        role: this.user?.role,
      }
      this.userService
        // @ts-ignore
        .editUser(this.user.id, data)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.userService.getUser()
            .pipe(takeUntil(this.destroy$))
            .subscribe((user: User) => this.user = user);
          this.notificationService.showSuccessMessage(`Information was successfully updated`);
        });
    } else {
      this.notificationService.showErrorMessage("The form is not valid!");
    }
  }

}
