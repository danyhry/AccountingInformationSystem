import {Component, Inject, OnInit} from '@angular/core';
import {Base} from "../../../services/destroy.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../models/category";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../services/notification.service";
import {UserService} from "../../../services/user.service";
import {takeUntil} from "rxjs";
import {Expense} from "../../../models/expense";
import {ExpenseService} from "../../../services/expense.service";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.scss']
})
export class UpdateExpenseComponent extends Base implements OnInit {

  expenseForm!: FormGroup;

  categories: Category[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public expenseData: Expense,
              private expenseService: ExpenseService,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<UpdateExpenseComponent>,
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

    this.expenseForm = this.fb.group({
      id: [''],
      userId: ['', []],
      categoryId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+([,.][0-9]{1,2})?$')]],
      description: ['', [Validators.maxLength(50)]],
      date: ['', [Validators.required]]
    });

    if (this.expenseData) {
      console.log(this.expenseData);
      this.expenseForm.controls['categoryId'].setValue(this.expenseData.categoryId);
      this.expenseForm.controls['amount'].setValue(this.expenseData.amount);
      this.expenseForm.controls['description'].setValue(this.expenseData.description);
      this.expenseForm.controls['date'].setValue(this.expenseData.date);
    }

  }

  updateExpense(): void {
    console.log(this.expenseForm.value);
    if (this.expenseForm.valid) {
      this.expenseService.updateExpense(this.expenseForm.value, this.expenseData.id)
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
    } else {
      this.notificationService.showErrorMessage(`Something is wrong.`);
    }
  }

}
