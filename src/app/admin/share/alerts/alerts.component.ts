import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})

export class AlertsComponent {
  @Input() alert: {
            msg: {},
            type: string
          };

  onClick() {
    this.alert.msg = {};
    this.alert.type = '';
  }
}
