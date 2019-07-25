import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  public sessonList: [];
  public selectedSesson = 2;
  public getSelectedSessonId: Number;
  public vehicleList: object[];
  public searchedVehicleNumber: Number;
  public loadData: Boolean = true;
  public tableHeaderFilter: Boolean[] = [false, false, false, false];
  public rowSubMenu: boolean[];
  public searchedVendorName: string;
  public searchedTypeOfVehicle: string;
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeydownHandler(event: KeyboardEvent) {
    console.log(event);
    this.tableHeaderFilter = this.tableHeaderFilter.map(_ => false);
    this.rowSubMenu = this.rowSubMenu.map(_ => false);
  }
  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.callGetAPI('../../../assets/json/sessonList.json').subscribe(data => {
      this.sessonList = data['sessonList'];
    });
    this.apiService.callGetAPI('../../../assets/json/vehicleList.json').subscribe(data => {
      this.vehicleList = data['vehicleList'];
      this.rowSubMenu = this.vehicleList.map(_ => false);
    });
  }

  navigateTo(navigateurl: string) {
    this.router.navigate([navigateurl]);
  }

  selectedSessonEvent(e) {
    this.getSelectedSessonId = e.srcElement.value;
  }

  onTableScroll() {
    if (this.loadData) {
      this.loadData = false;
    this.apiService.callGetAPI('../../../assets/json/vehicleListMore.json').subscribe(data => {
      const moreVehicle = data['vehicleList'];
      this.vehicleList.push(...moreVehicle);
      this.rowSubMenu = this.vehicleList.map(_ => false);
    });
  }
  }

  openFilterMenu(index: number) {
    this.rowSubMenu = this.rowSubMenu.map(_ => false);
    this.tableHeaderFilter = this.tableHeaderFilter.map((_, i) => {
      if (this.tableHeaderFilter[index]) {
        return false;
      } else {
        if (i === index) {
          return true;
        }
      }
    });
  }

  openRowSubMenu(index: number) {
    this.tableHeaderFilter = this.tableHeaderFilter.map(_ => false);
    this.rowSubMenu = this.rowSubMenu.map((_, i) => {
      if (this.rowSubMenu[index]) {
        return false;
      } else {
        if (i === index) {
          return true;
        }
      }
    });
  }

}
