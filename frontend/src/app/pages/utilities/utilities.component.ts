import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
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
import {MatTableDataSource} from "@angular/material/table";
import {UpdateUtilityComponent} from "./update-utility/update-utility.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateUtilityComponent} from "./create-utility/create-utility.component";
import {ConfirmationDialogComponent} from "../../modules/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class UtilitiesComponent extends Base implements OnInit {

  utilityTypes!: UtilityType[];
  addresses!: Address[];
  utilities!: Utility[];

  userId!: number;
  utilitiesDataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = ['title', 'previousValue', 'currentValue', 'usage', 'tariff', 'amountToPay', 'action'];

  constructor(private fb: FormBuilder,
              private addressService: AddressService,
              private utilityTypeService: UtilityTypeService,
              private userService: UserService,
              private utilitiesService: UtilitiesService,
              private notificationService: NotificationService,
              private dialog: MatDialog,
  ) {
    super();
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

    this.getUpdatedUtilities();
  }

  getUpdatedUtilities(): void {
    this.utilitiesService.getUtilitiesByUserId(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((utilities: Utility[]) => {
        this.utilities = utilities;
        this.utilitiesDataSource = new MatTableDataSource(utilities);
      });
  }

  getUtilityName(utilityTypeId: number) {
    const utilityType = this.utilityTypes.find(c => c.id === utilityTypeId);
    return utilityType ? utilityType.name : '';
  }

  updateUtility(utility: Utility): void {
    this.dialog.open(UpdateUtilityComponent, {
      width: '35%',
      data: utility
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value === 'update') {
          this.getUpdatedUtilities();
        }
      });
  }

  createUtility() {
    this.dialog.open(CreateUtilityComponent, {
      width: '35%'
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value === 'update') {
          this.getUpdatedUtilities();
        }
      });
  }

  deleteUtility(utility: Utility): void {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Підтвердження',
        message: 'Ви дійсно хочете видалити цю послугу?'
      }
    });
    dialog.afterClosed().subscribe((isDelete: boolean) => {
      if (isDelete) {
        this.utilitiesService.deleteUtility(utility.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.notificationService.showSuccessMessage(`Послуга успішно видалена.`);
            this.getUpdatedUtilities();
          });
      }
    });

  }
}
