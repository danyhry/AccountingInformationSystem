import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {MatPaginator} from "@angular/material/paginator";
import {Base} from "../../../services/destroy.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {NotificationService} from "../../../services/notification.service";
import {CreateUserComponent} from "./create-user/create-user.component";
import {ConfirmationDialogComponent} from "../../../modules/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-user",
  styleUrls: ['user.component.scss'],
  templateUrl: "user.component.html"
})
export class UserComponent extends Base implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role', 'action'];

  usersDataSource!: MatTableDataSource<any>;

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe();
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.usersDataSource = new MatTableDataSource(res);
          this.usersDataSource.paginator = this.paginator;
          this.usersDataSource.sort = this.sort;
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.usersDataSource.paginator) {
      this.usersDataSource.paginator.firstPage();
    }
  }

  createUser(): void {
    this.dialog.open(CreateUserComponent, {
      width: '35%'
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        console.log(value);
        if (value === 'update') {
          this.getAllUsers();
        }
      });
  }

  editUser(user: User) {
    this.dialog.open(EditUserComponent, {
      width: '35%',
      data: user
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value === 'update') {
          this.getAllUsers();
        }
      });
  }

  deleteUser(user: User) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Підтвердження',
        message: 'Ви впевнені що хочете видалити цього користувача?'
      }
    });

    dialog.afterClosed().subscribe((isDelete: boolean) => {
      if (isDelete) {
        this.userService.deleteUser(user.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
              this.notificationService.showSuccessMessage(`Користувач був успішно видален.`);
              this.getAllUsers();
            }
          )
      }
    });
  }
}
