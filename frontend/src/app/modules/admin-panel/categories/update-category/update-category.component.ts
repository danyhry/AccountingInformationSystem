import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../services/notification.service";
import {CategoryService} from "../../../../services/category.service";
import {Category} from "../../../../models/category";
import {takeUntil} from "rxjs";
import {Base} from "../../../../services/destroy.service";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent extends Base implements OnInit {

  categoryForm !: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public categoryEditData: Category,
              private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<UpdateCategoryComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      id: [''],
      name: ['']
    });

    if (this.categoryEditData) {
      this.categoryForm.controls['name'].setValue(this.categoryEditData.name);
    }
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      this.categoryService.updateCategory(this.categoryEditData.id, this.categoryForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccessMessage(`Категорію успішно оновлено.`);
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
