import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Income} from "../../../models/income";
import {IncomeService} from "../../../services/income.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {Base} from "../../../services/destroy.service";
import {NotificationService} from "../../../services/notification.service";
import {UserService} from "../../../services/user.service";
import {Category} from "../../../models/category";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.scss']
})
export class UpdateIncomeComponent extends Base implements OnInit {

  incomeForm!: FormGroup;

  categories: Category[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public incomeData: Income,
              private incomeService: IncomeService,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<UpdateIncomeComponent>,
              private userService: UserService,
              private categoryService: CategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories = categories;
      });

    this.incomeForm = this.fb.group({
      id: [''],
      userId: ['', []],
      categoryId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+([,.][0-9]{1,2})?$')]],
      description: ['', [Validators.maxLength(50)]],
      date: ['', [Validators.required]]
    });

    if (this.incomeData) {
      console.log(this.incomeData);
      this.incomeForm.controls['categoryId'].setValue(this.incomeData.categoryId);
      this.incomeForm.controls['amount'].setValue(this.incomeData.amount);
      this.incomeForm.controls['description'].setValue(this.incomeData.description);
      this.incomeForm.controls['date'].setValue(this.incomeData.date);
    }

  }

  updateIncome(): void {
    console.log(this.incomeForm.value);
    if (this.incomeForm.valid) {
      this.incomeService.updateIncome(this.incomeForm.value, this.incomeData.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(`Дохід успішно оновлено.`);
            this.dialogRef.close('update');
          },
          error: (response) => {
            console.log("error");
            this.notificationService.showErrorMessage(response.error.message);
          }
        })
    } else {
      this.notificationService.showErrorMessage(`Something is wrong.`);
    }
  }
}
