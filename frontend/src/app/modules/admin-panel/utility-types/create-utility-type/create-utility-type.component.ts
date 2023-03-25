import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../services/notification.service";
import {Base} from "../../../../services/destroy.service";
import {takeUntil} from "rxjs";
import {UtilityTypeService} from "../../../../services/utility-type.service";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-utility-type.component.html',
  styleUrls: ['./create-utility-type.component.scss']
})
export class CreateUtilityTypeComponent extends Base implements OnInit {

  utilityTypeForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<CreateUtilityTypeComponent>,
              private utilityTypeService: UtilityTypeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.utilityTypeForm = this.formBuilder.group({
      name: [''],
      tariff: ['']
    });
  }

  createCategory() {
    if (this.utilityTypeForm.valid) {
      const data = {
        name: this.utilityTypeForm.value.name,
        tariff: this.utilityTypeForm.value.tariff,
      };
      this.utilityTypeService.createUtilityType(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(`Тип успішно створено.`);
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
