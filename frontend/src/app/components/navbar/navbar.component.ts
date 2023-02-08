import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit{
  _isAuthenticated!: boolean;

  constructor(private userService: UserService,
              private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this._isAuthenticated = this.userService.isAuthenticated();
    console.log("_isAuthenticated: ", this._isAuthenticated);
  }

  _logOut() {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    window.location.reload();
  }

}
