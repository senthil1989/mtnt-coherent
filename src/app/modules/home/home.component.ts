import { Component, OnInit, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  routeSub;
  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {
    this.routeSub = this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }
  ngOnInit() {
  }
}
