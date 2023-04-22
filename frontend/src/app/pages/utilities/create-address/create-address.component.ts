import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {Address} from "../../../models/address.model";
import {AddressService} from "../../../services/address.service";
import {UserService} from "../../../services/user.service";
import {NotificationService} from "../../../services/notification.service";
import {Base} from "../../../services/destroy.service";

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent extends Base implements OnInit {

  addressForm!: FormGroup;

  userId!: number;

  addresses!: Address[];


  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<CreateAddressComponent>,
              private addressService: AddressService,
              private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserFromStorage().id;
    this.addressForm = this.formBuilder.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required]
    });

  }

  createAddress() {
    if (this.addressForm.valid) {
      const address: Address = {
        id: 0,
        userId: this.userId,
        streetAddress: this.addressForm.value.streetAddress,
        city: this.addressForm.value.city,
      };
      this.addressService.createAddress(address)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(`Адрес успішно додано.`);
            this.dialogRef.close('update');
          },
          error: (response) => {
            console.log("error");
            this.notificationService.showErrorMessage(response.error.message);
          }
        })
    }
  }

}
