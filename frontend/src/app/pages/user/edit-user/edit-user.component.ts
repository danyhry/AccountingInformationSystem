import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {Base} from "../../../services/destroy.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends Base implements OnInit {

  _userForm !: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public userEditData: User,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<EditUserComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    this._userForm = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      role: ['']
    });

    if (this.userEditData) {
      this._userForm.controls['firstName'].setValue(this.userEditData.firstName);
      this._userForm.controls['lastName'].setValue(this.userEditData.lastName);
      this._userForm.controls['email'].setValue(this.userEditData.email);
      this._userForm.controls['role'].setValue(this.userEditData.role);
    }
  }


  _updateUser() {
    if (this._userForm.valid) {
      this.userService.editUser(this.userEditData.id, this._userForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(`User was successfully updated.`);
            this.dialogRef.close('update');
          },
          error: () => {
            console.log("error");
            this.notificationService.showErrorMessage(`Something is wrong.`);
          }
        })
    }
  }

}
