import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Base} from "../../services/destroy.service";
import {takeUntil} from "rxjs";
import {Address} from "../../models/address.model";
import {UtilityType} from "../../models/utility-type.model";
import {AddressService} from "../../services/address.service";
import {UtilityTypeService} from "../../services/utility-type.service";
import {UserService} from "../../services/user.service";
import {UtilitiesService} from "../../services/utilities.service";
import {Utility} from "../../models/utility.model";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class UtilitiesComponent extends Base implements OnInit {
  utilityForm: FormGroup;
  utilityTypes!: UtilityType[];
  addresses!: Address[];

  userId!: number;

  constructor(private fb: FormBuilder,
              private addressService: AddressService,
              private utilityTypeService: UtilityTypeService,
              private userService: UserService,
              private utilitiesService: UtilitiesService,
              private notificationService: NotificationService
  ) {
    super();
    this.utilityForm = this.fb.group({
      id: [''],
      addressId: ['', Validators.required],
      utilityTypeId: ['', Validators.required],
      previousValue: [''],
      currentValue: ['', Validators.required],
      tariff: ['', Validators.required],
      usage: [''],
      amountToPay: [''],
    });

  }

  ngOnInit() {
    this.userId = this.userService.getUserFromStorage().id;

    this.addressService
      .getAddressesByUserId(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((addresses: Address[]) => {
        this.addresses = addresses;
      });

    this.utilityTypeService.getUtilityTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((utilityTypes: UtilityType[]) => {
        this.utilityTypes = utilityTypes;
      });
  }


  onSubmit() {
    if (this.utilityForm.valid) {

      const newUtility: Utility = {
        id: this.utilityForm.value.id,
        addressId: this.utilityForm.value.addressId,
        utilityTypeId: this.utilityForm.value.utilityTypeId,
        previousValue: this.utilityForm.value.previousValue,
        currentValue: this.utilityForm.value.currentValue,
        tariff: this.utilityForm.value.tariff,
        usage: this.utilityForm.value.usage,
        amountToPay: this.utilityForm.value.amountToPay,
      };
      this.utilitiesService.saveUtility(newUtility)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (utility: Utility) => {
            console.log(utility);
            this.notificationService.showSuccessMessage("Платіж успішно додано")
          }
        })
    } else {
      this.utilityForm.markAllAsTouched();
    }

  }

}
