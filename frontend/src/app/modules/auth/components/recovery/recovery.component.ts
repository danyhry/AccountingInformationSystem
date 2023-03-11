// recovery-form.component.ts
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from "../../../../services/notification.service";
import {take} from "rxjs";
import {UserService} from "../../../../services/user.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryFormComponent implements OnInit {

  recoveryForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private userService: UserService,
              private dialogRef: MatDialogRef<RecoveryFormComponent>
  ) {
  }

  ngOnInit() {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.recoveryForm.valid) {
      localStorage.clear();
      sessionStorage.clear();
      this.dialogRef.close();
      this.userService.forgotPassword(this.recoveryForm.value)
        .pipe(take(1))
        .subscribe({
          next: () => {
            // this.notificationService.showSuccessMessage('Message was sent');
            this.notificationService.showSuccessMessage(`Ми надіслали посилання для відновлення доступу на вашу електронну пошту ${this.recoveryForm.value.email}.`)
            console.log("recovery submit successfully");
          },
          error: (response) => {
            this.notificationService.showErrorMessage(response.error.message);
          }
        });
    } else {
      this.notificationService.showErrorMessage(`Упс, щось пішло не так.`);
    }
  }
}
