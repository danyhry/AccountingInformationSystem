import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {MatPaginator} from "@angular/material/paginator";
import {Base} from "../../services/destroy.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {takeUntil} from "rxjs";
import {EditUserComponent} from "./edit-user/edit-user.component";

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

  _displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role', 'action'];

  _users!: MatTableDataSource<any>;
  // users !: any;

  _userForm!: FormGroup;

  constructor(private userService: UserService,
              private toastr: ToastrService,
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
          this._users = new MatTableDataSource(res);
          this._users.paginator = this.paginator;
          this._users.sort = this.sort;
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._users.filter = filterValue.trim().toLowerCase();

    if (this._users.paginator) {
      this._users.paginator.firstPage();
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
    this.userService
      .deleteUser(user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
          this.toastr.success(`User was successfully deleted.`, 'Success', {
            timeOut: 4000,
          });
          this.getAllUsers();
        }
      )
  }
}
