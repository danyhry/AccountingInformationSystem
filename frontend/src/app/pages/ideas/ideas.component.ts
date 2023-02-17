import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Base} from "../../services/destroy.service";
import {User} from "../../models/user";

@Component({
  selector: "app-ideas",
  templateUrl: "ideas.component.html",
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent extends Base implements OnInit {

  users!: User[];

  constructor(private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
  }

}
