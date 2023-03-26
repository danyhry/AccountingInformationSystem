import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../models/user";
import {NotificationService} from "../../../../services/notification.service";
import {Base} from "../../../../services/destroy.service";
import {takeUntil} from "rxjs";
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent extends Base implements OnInit {

  categoryForm !: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public userData: User,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<CreateCategoryComponent>,
              private categoryService: CategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['']
    });
  }

  createCategory() {
    if (this.categoryForm.valid) {
      const data = {
        name: this.categoryForm.value.name,
      };
      this.categoryService.createCategory(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(`Категорію успішно створено.`);
            this.dialogRef.close('update');
          },
          error: (response) => {
            console.log("error");
            this.notificationService.showErrorMessage(response.error.message);
          }
        })
    }
  }
}
