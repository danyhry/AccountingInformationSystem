import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {Address} from "../../../models/address.model";
import {UtilityType} from "../../../models/utility-type.model";
import {AddressService} from "../../../services/address.service";
import {UtilityTypeService} from "../../../services/utility-type.service";
import {UserService} from "../../../services/user.service";
import {NotificationService} from "../../../services/notification.service";
import {CategoryService} from "../../../services/category.service";
import {Base} from "../../../services/destroy.service";
import {UtilitiesService} from "../../../services/utilities.service";
import {Utility} from "../../../models/utility.model";

@Component({
  selector: 'app-create-utility',
  templateUrl: './create-utility.component.html',
  styleUrls: ['./create-utility.component.scss']
})
export class CreateUtilityComponent extends Base implements OnInit {

  utilityForm !: FormGroup;

  userId!: number;

  addresses!: Address[];

  utilityTypes!: UtilityType[];


  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<CreateUtilityComponent>,
              private categoryService: CategoryService,
              private addressService: AddressService,
              private utilityTypeService: UtilityTypeService,
              private userService: UserService,
              private utilityService: UtilitiesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.utilityForm = this.formBuilder.group({
      id: [''],
      addressId: ['', Validators.required],
      utilityTypeId: ['', Validators.required],
      currentValue: ['', Validators.required]
    });

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

  createUtility() {
    if (this.utilityForm.valid) {
      const newUtility: Utility = {
        id: 0,
        userId: this.userId,
        addressId: this.utilityForm.value.addressId,
        utilityTypeId: this.utilityForm.value.utilityTypeId,
        previousValue: 0,
        currentValue: this.utilityForm.value.currentValue,
        tariff: 0,
        usage: 0,
        amountToPay: 0,
      };
      this.utilityService.saveUtility(newUtility)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(`Послугу успішно створено.`);
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
