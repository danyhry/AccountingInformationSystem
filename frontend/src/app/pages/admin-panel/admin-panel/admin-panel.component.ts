import {Component} from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  activeTab: string = 'користувачі';

  onTabChanged(event: any) {
    this.activeTab = event.tab.textLabel.toLowerCase();
  }
}
