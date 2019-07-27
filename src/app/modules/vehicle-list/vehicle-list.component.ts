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
  public tableHeaderFilter: Boolean[] = [false, false, false, false];
  public rowSubMenu: boolean[];
  public searchedVendorName: string;
  public searchedTypeOfVehicle: string;
  public showDetailedView: Boolean = false;
  public vehicleDetailIndex: number;
  public dummyVehicleList: object[] = [];
  public vehicleListForHeader: object[];
  public selectedVendorNames: string[] = [];

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeydownHandler(event: KeyboardEvent) {
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
      this.vehicleListForHeader = data['vehicleList'];
      this.rowSubMenu = this.vehicleList.map(_ => false);
    });
  }

  navigateTo(navigateurl: string) {
    this.router.navigate([navigateurl]);
  }

  selectedSessonEvent(e) {
    this.getSelectedSessonId = e.srcElement.value;
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

  detailedViewCloseEvent() {
    this.showDetailedView = false;
    this.vehicleDetailIndex = null;
  }

  viewOrEditClickEvent(i: number) {
    this.vehicleDetailIndex = i;
    this.showDetailedView = true;
    this.rowSubMenu = this.rowSubMenu.map(_ => false);
  }

  vendorNameSelectList(e) {
    if (e.srcElement.checked) {
      if (this.selectedVendorNames.filter(val => val === e.srcElement.name).length === 0) {
        this.selectedVendorNames.push(e.srcElement.name);
      }
    } else {
      if (!(this.selectedVendorNames.filter(val => val === e.srcElement.name).length === 0)) {
        this.selectedVendorNames = this.findAndRemoveFromArray(this.selectedVendorNames, e.srcElement.name);
      }
    }
  }

  findAndRemoveFromArray(array: string[], findValue: string) {
    const index = array.indexOf(findValue);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  vendorSelectedList(i) {

  }

}
