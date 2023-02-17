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

  _isAuthenticated!: boolean;

  _user!: User | undefined;

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
    this._isAuthenticated = this.authService.isAuthenticated();
    if(this._isAuthenticated) {
      this.userService.getUser()
        .pipe(takeUntil(this.destroy$))
        .subscribe((user: User) => {
          this._user = user;
        });
    }
  }

  _logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
