import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {MediaMatcher} from "@angular/cdk/layout";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Base} from "../../services/destroy.service";
import {takeUntil} from "rxjs";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent extends Base implements OnInit {

  mobileQuery: MediaQueryList;

  user!: User | undefined;

  private readonly _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              public authService: AuthService,
              private router: Router,
              private userService: UserService,
  ) {
    super();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.userService.userChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        if (user?.id == 0) {
          this.getUser();
        }
      });
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  }

  _logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.userService.clearUser();

    this.router.navigateByUrl('/login');
  }
}
