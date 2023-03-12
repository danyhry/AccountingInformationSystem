import {Component, Inject, OnInit} from '@angular/core';
import {Base} from "../../../services/destroy.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../models/category";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Income} from "../../../models/income";
import {NotificationService} from "../../../services/notification.service";
import {UserService} from "../../../services/user.service";
import {takeUntil} from "rxjs";
import {ExpenseService} from "../../../services/expense.service";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent extends Base implements OnInit {

  createExpenseForm!: FormGroup;

  categories: Category[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public createIncomeData: Income,
              private expenseService: ExpenseService,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<CreateExpenseComponent>,
              private userService: UserService,
              private categoryService: CategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories = categories.sort((a, b) => a.name.localeCompare(b.name));
      });

    const currentDate = new Date();
    this.createExpenseForm = this.fb.group({
      id: [''],
      userId: ['', []],
      categoryId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+([,.][0-9]{1,2})?$')]],
      description: ['', [Validators.maxLength(50)]],
      date: [currentDate.toISOString().substring(0, 10), [Validators.required]]
    });
  }

  createExpense(): void {
    console.log(this.createExpenseForm.value);

    if (this.createExpenseForm.valid && this.userService.isAuthenticated()) {

      this.userService.getUser()
        .pipe(takeUntil(this.destroy$))
        .subscribe(user => {
          const expense = this.createExpenseForm.value;
          expense.userId = user.id;

          expense.date = new Date(expense.date);
          const dateValue = expense.date ? new Date(expense.date.getTime() - expense.date.getTimezoneOffset() * 60 * 1000) : null;
          expense.date = dateValue ? dateValue.toISOString() : null;

          this.expenseService.addExpense(expense)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                this.notificationService.showSuccessMessage(`Витрату успішно створено.`);
                this.dialogRef.close('update');
              },
              error: () => {
                console.log("error");
                this.notificationService.showErrorMessage(`Упс, щось пішло не так.`);
              }
            })
        });
    } else {
      this.notificationService.showErrorMessage(`Упс, щось пішло не так.`);
    }
  }

}
