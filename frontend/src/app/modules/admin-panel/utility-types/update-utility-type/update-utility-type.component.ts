import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../services/notification.service";
import {takeUntil} from "rxjs";
import {Base} from "../../../../services/destroy.service";
import {UtilityTypeService} from "../../../../services/utility-type.service";
import {UtilityType} from "../../../../models/utility-type.model";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-utility-type.component.html',
  styleUrls: ['./update-utility-type.component.scss']
})
export class UpdateUtilityTypeComponent extends Base implements OnInit {

  utilityTypeForm !: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public utilityTypeEditData: UtilityType,
              private formBuilder: FormBuilder,
              private utilityTypeService: UtilityTypeService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<UpdateUtilityTypeComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    this.utilityTypeForm = this.formBuilder.group({
      name: [''],
      tariff: [''],
    });

    if (this.utilityTypeEditData) {
      this.utilityTypeForm.controls['name'].setValue(this.utilityTypeEditData.name);
      this.utilityTypeForm.controls['tariff'].setValue(this.utilityTypeEditData.tariff);
    }
  }

  updateUtilityType(): void {
    if (this.utilityTypeForm.valid) {
      this.utilityTypeService.updateUtilityType(this.utilityTypeEditData.id, this.utilityTypeForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(`Тип успішно оновлено.`);
            this.dialogRef.close('update');
          },
          error: (response) => {
            console.log(response)
            this.notificationService.showErrorMessage(response.error.message);
          }
        })
    }
  }
}
