import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {Base} from "../../services/destroy.service";
import {takeUntil} from "rxjs";
import {User} from "../../models/user";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends Base implements OnInit {

  user!: User;

  showErrors!: boolean;

  contactForm: FormGroup = this.fb.group({
    firstName: [''],
    email: [''],
    message: ['']
  });


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private notificationService: NotificationService,
              private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.userService.isAuthenticated()) {
      this.userService.getUser()
        .pipe(takeUntil(this.destroy$))
        .subscribe((user) => {
          this.user = user;
        });
    }
  }

  _onSubmit() {
    console.log(this.contactForm);
    if (this.contactForm.valid) {
      this.userService.sendMessageToAdmin(this.contactForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            // this.notificationService.showSuccessMessage('Message was sent');
          },
          error: () => {
            this.notificationService.showErrorMessage('Error');
            this.showErrors = true;
          }
        });
      this.notificationService.showSuccessMessage('Message was sent');
    } else {
      this.notificationService.showErrorMessage('Form is not valid, please fill correct values');
      this.showErrors = true;
    }
  }
}
