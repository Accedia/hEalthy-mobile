import { Component, Input } from '@angular/core';

@Component({
  selector: 'substance-details',
  templateUrl: './substance-details.component.html',
  styleUrls: ['./substance-details.component.scss']
})
export class SubstanceDetailsComponent {
  @Input() private substance: any;
  private isExpanded = false;

  toggleIsExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
