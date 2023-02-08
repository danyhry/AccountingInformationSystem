import {Component, OnInit} from "@angular/core";
import {takeUntil} from "rxjs";
import {UserService} from "../../services/user.service";
import {Base} from "../../services/destroy.service";
import {User} from "../../models/user";

@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent extends Base implements OnInit {

  users!: User[];

  constructor(private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
  }

}
