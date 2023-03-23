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
      id: [''],
      name: ['']
    });

    if (this.utilityTypeEditData) {
      this.utilityTypeForm.controls['name'].setValue(this.utilityTypeEditData.name);
    }
  }

  updateCategory() {
    if (this.utilityTypeForm.valid) {
      this.utilityTypeService.updateUtilityType(this.utilityTypeEditData.id, this.utilityTypeForm.value)
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
