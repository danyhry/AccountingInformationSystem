import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {Utility} from "../../../models/utility.model";
import {UtilitiesService} from "../../../services/utilities.service";
import {NotificationService} from "../../../services/notification.service";
import {Base} from "../../../services/destroy.service";
import {UtilityTypeService} from "../../../services/utility-type.service";
import {UtilityType} from "../../../models/utility-type.model";

@Component({
  selector: 'app-update-utility',
  templateUrl: './update-utility.component.html',
  styleUrls: ['./update-utility.component.scss']
})
export class UpdateUtilityComponent extends Base implements OnInit {

  utilityForm!: FormGroup;

  utilityTypes!: UtilityType[];

  constructor(@Inject(MAT_DIALOG_DATA) public utilityUpdateData: Utility,
              private formBuilder: FormBuilder,
              private utilityService: UtilitiesService,
              private utilityTypeService: UtilityTypeService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<UpdateUtilityComponent>
  ) {
    super();
  }

  ngOnInit(): void {

    // this.utilityTypeService.getUtilityTypes()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(utilityTypes => {
    //     this.utilityTypes = utilityTypes;
    //     console.log(utilityTypes);
    //   });

    this.utilityForm = this.formBuilder.group({
      // utilityTypeId: ['', Validators.required],
      currentValue: ['', [Validators.required, Validators.pattern('^[0-9]+([,.][0-9]{1,2})?$')]]
    });

    if (this.utilityUpdateData) {
      // this.utilityForm.controls['utilityTypeId'].setValue(this.utilityUpdateData.utilityTypeId);
      this.utilityForm.controls['currentValue'].setValue(this.utilityUpdateData.currentValue);
    }
  }

  updateCategory() {
    if (this.utilityForm.valid) {
      this.utilityService.updateUtility(this.utilityUpdateData.id, this.utilityForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(`Категорію успішно оновлено.`);
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
