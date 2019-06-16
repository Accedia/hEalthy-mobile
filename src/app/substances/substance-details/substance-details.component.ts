import { Component, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'substance-details',
  templateUrl: './substance-details.component.html',
  styleUrls: ['./substance-details.component.scss']
})
export class SubstanceDetailsComponent {
  @Input() private substance: any;
  private isExpanded = false;

  constructor(
    private browser: InAppBrowser
  ) {}

  public toggleIsExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  public getColor(status: string): string {
    switch (status) {
      case 'Negative':
        return 'red';
      case 'Positive':
        return 'green';
      case 'Ambiguous':
        return 'orange';
      default:
        return 'gray';
    }
  }

  public getText(status: string): string {
    switch (status) {
      case 'NoData':
        return 'No data';
      case 'NotApplicable ':
        return 'Not applicable';
      case 'NotDetermined ':
        return 'Not determined';
      default:
        return status || 'No data';
    }
  }

  public openBrowserLink(link: string) {
    this.browser.create(link, '_system');
  }
}
