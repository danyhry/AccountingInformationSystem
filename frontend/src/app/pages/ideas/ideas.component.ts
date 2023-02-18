import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Base} from "../../services/destroy.service";
import {User} from "../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-ideas",
  templateUrl: "ideas.component.html",
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent extends Base implements OnInit {

  users!: User[];

  value = '';

  investmentsForm: FormGroup = this.fb.group({
    startingCapital: ['', [Validators.required]],
    incomes: ['', [Validators.required]],
    expanses: ['', [Validators.required]],
    expectedIncome: ['3', [Validators.required]],
    rate: ['12', [Validators.required]],
    inflation: ['4', [Validators.required]],
    age: ['', [Validators.required]],
  });

  constructor(private userService: UserService,
              private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  createInvestmentModel() {
    console.log('createInvestmentModel');
  }
}
