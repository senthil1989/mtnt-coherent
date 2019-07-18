import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { document } from 'global/document';
import { ConnectionService } from 'ng-connection-service';
declare var $: any;
declare var ga: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isConnected: any;
  status: any = true;
  constructor(private router: Router,
    private connectionService: ConnectionService) {
    this.router.events.subscribe((res) => {

    });
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = true;
      } else {
        this.status = false;
      }
    });
  }
}
