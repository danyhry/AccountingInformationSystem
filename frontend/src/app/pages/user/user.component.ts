import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {MatPaginator} from "@angular/material/paginator";
import {Base} from "../../services/destroy.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {NotificationService} from "../../services/notification.service";

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

  users!: MatTableDataSource<any>;

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.users = new MatTableDataSource(res);
          this.users.paginator = this.paginator;
          this.users.sort = this.sort;
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
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
    this.userService.deleteUser(user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
          this.notificationService.showSuccessMessage(`User was successfully deleted.`);
          this.getAllUsers();
        }
      )
  }
}
