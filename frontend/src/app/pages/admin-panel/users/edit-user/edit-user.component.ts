import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";
import {Base} from "../../../../services/destroy.service";
import {NotificationService} from "../../../../services/notification.service";
import {Role} from "../../../../models/role";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends Base implements OnInit {

  userForm !: FormGroup;

  roles: Role[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public userEditData: User,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<EditUserComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      role: new FormControl()
    });

    if (this.userEditData) {
      console.log(this.roles);
      this.userService.getRoles().subscribe(roles => {
        this.roles = roles;
        const currentUserRole = this.roles.find(role => role.id === this.userEditData.role.id);
        console.log(currentUserRole);
        this.userForm.controls['firstName'].setValue(this.userEditData.firstName);
        this.userForm.controls['lastName'].setValue(this.userEditData.lastName);
        this.userForm.controls['email'].setValue(this.userEditData.email);
        this.userForm.controls['role'].setValue(currentUserRole);
      });

    }
  }


  updateUser() {
    if (this.userForm.valid) {
      this.userService.editUser(this.userEditData.id, this.userForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(`Користувача успішно оновлено.`);
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
