import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../models/user";
import {NotificationService} from "../../../../services/notification.service";
import {takeUntil} from "rxjs";
import {AuthService} from "../../../../services/auth.service";
import {Base} from "../../../../services/destroy.service";
import {MustMatch} from "../../../auth/validators/must-match.validator";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent extends Base implements OnInit {

  userForm !: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public userData: User,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<CreateUserComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  createUser() {
    if (this.userForm.valid) {
      const data = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        confirmPassword: this.userForm.value.confirmPassword,
      };
      this.authService.register(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(`Користувача успішно створено.`);
            this.dialogRef.close('update');
          },
          error: () => {
            console.log("error");
            this.notificationService.showErrorMessage(`Упс, щось пішло не так.`);
          }
        })
    }
  }

}
