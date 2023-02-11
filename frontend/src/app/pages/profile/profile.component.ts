import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Base} from "../../services/destroy.service";
import {takeUntil} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {MustMatch} from "../../modules/auth/validators/must-match.validator";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends Base implements OnInit {

  user!: User;

  _changeForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    renewPassword: ['', [Validators.required]],
  }, {
    validator: MustMatch("newPassword", "renewPassword")
  });

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  _onSubmit() {
    console.log(this._changeForm);
    if (this._changeForm.valid) {
      const data = {
        currentPassword: this._changeForm.value.currentPassword,
        newPassword: this._changeForm.value.newPassword,
        renewPassword: this._changeForm.value.renewPassword
      }
      // @ts-ignore
      this.userService.updatePassword(data, this.user.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.toastr.success(`Congratulations, you have successfully changed your password.`, 'Success', {
            timeOut: 4000,
          })
        });
    }
  }

}
