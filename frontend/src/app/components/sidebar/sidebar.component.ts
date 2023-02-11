import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {MediaMatcher} from "@angular/cdk/layout";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {

  mobileQuery: MediaQueryList;

  _isAuthenticated!: boolean;

  private readonly _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              public authService: AuthService,
              private router: Router,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this._isAuthenticated = this.authService.isAuthenticated();
  }

  _logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
