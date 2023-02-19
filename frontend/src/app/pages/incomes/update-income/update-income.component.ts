import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Income} from "../../../models/income";
import {IncomeService} from "../../../services/income.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {Base} from "../../../services/destroy.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.scss']
})
export class UpdateIncomeComponent extends Base implements OnInit {

  updateIncomeForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public incomeUpdateData: Income,
    private incomeService: IncomeService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<UpdateIncomeComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    this.updateIncomeForm = this.fb.group({
      id: [''],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+([,.][0-9]{1,2})?$')]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', [Validators.required, Validators.maxLength(30)]],
      date: ['', [Validators.required]]
    });

    if (this.incomeUpdateData) {
      console.log(this.incomeUpdateData);
      this.updateIncomeForm.controls['amount'].setValue(this.incomeUpdateData.amount);
      this.updateIncomeForm.controls['description'].setValue(this.incomeUpdateData.description);
      this.updateIncomeForm.controls['category'].setValue(this.incomeUpdateData.category);
      this.updateIncomeForm.controls['date'].setValue(this.incomeUpdateData.date);
    }

  }

  updateIncome(): void {
    if (this.updateIncomeForm.valid) {
      this.incomeService.updateIncome(this.updateIncomeForm.value, this.incomeUpdateData.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(`Income was successfully updated.`);
            this.dialogRef.close('update');
          },
          error: () => {
            console.log("error");
            this.notificationService.showErrorMessage(`Something is wrong.`);
          }
        })
    }
  }
}
