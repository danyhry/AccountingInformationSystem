import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Income} from "../../../models/income";
import {IncomeService} from "../../../services/income.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../services/notification.service";
import {takeUntil} from "rxjs";
import {Base} from "../../../services/destroy.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss']
})
export class CreateIncomeComponent extends Base implements OnInit {

  createIncomeForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public createIncomeData: Income,
              private incomeService: IncomeService,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<CreateIncomeComponent>,
              private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createIncomeForm = this.fb.group({
      id: [''],
      userId: ['', []],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+([,.][0-9]{1,2})?$')]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      date: ['', [Validators.required]]
    });
  }

  createIncome(): void {
    console.log(this.createIncomeForm.value);
    if (this.createIncomeForm.valid && this.userService.isAuthenticated()) {
      const income = this.createIncomeForm.value;
      this.userService.getUser().subscribe(user => {
        income.userId = user.id;
        console.log(user);
        this.incomeService.addIncome(income)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.notificationService.showSuccessMessage(`Income was successfully created.`);
              this.dialogRef.close('update');
            },
            error: () => {
              console.log("error");
              this.notificationService.showErrorMessage(`Something is wrong.`);
            }
          })
      });
    } else {
      this.notificationService.showErrorMessage(`Something is wrong.`);
    }
  }

}
