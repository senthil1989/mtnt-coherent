import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../core/services/api.service';
import { VehicleList } from './vehicle-list-interface/vehicle-list.interface';
import { Document } from '../vehicle-registration/vehicle-registration-interface/vehicle-registration.interface';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  public sessonList: [];
  public selectedSesson = 2;
  public getSelectedSessonId: Number;
  public vehicleList: VehicleList[];
  public searchedVehicleNumber: Number;
  public tableHeaderFilter: Boolean[] = [false, false, false, false];
  public rowSubMenu: boolean[];
  public searchedVendorName: string;
  public searchedTypeOfVehicle: string;
  public showDetailedView: Boolean = false;
  public vehicleDetailIndex: number;
  public dummyVehicleList: object[] = [];
  public selectedVendorNames: string[] = [];
  public selectTypeOfVehicle: string[] = [];
  public vehicleStatusSelect: string;
  public vendorStatusSelect: string;
  public documentDetails: any;
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeydownHandler() {
    this.tableHeaderFilter = this.tableHeaderFilter.map(_ => false);
    this.rowSubMenu = this.rowSubMenu.map(_ => false);
  }
  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    // this.apiService.callGetAPI('../../../assets/json/sessonList.json').subscribe(data => {
    //   this.sessonList = data['sessonList'];
    // });
    this.apiService.callPostAPI('getVehicleDetails', {}).subscribe(data => {
      this.vehicleList = data['vehicleList'];
      this.vehicleList.forEach((val, i) => {
        this.vehicleList[i].softDelete = val.softDelete ? 'Actve' : 'Inactive';
      });
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
    this.getDocumentDetailsApi(this.vehicleDetailIndex);
    this.showDetailedView = true;
    this.rowSubMenu = this.rowSubMenu.map(_ => false);
  }

  getDocumentDetailsApi(vehicleDetailIndex) {
    this.apiService.callPostAPI(`getDocumentDetails`, {vehicleId : this.vehicleList[vehicleDetailIndex].vehicleid}).subscribe(data => {
      this.documentDetails =  data;
      console.log(this.documentDetails);
    });
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

  typeOfVehicleSelectList(e) {
    if (e.srcElement.checked) {
      if (this.selectTypeOfVehicle.filter(val => val === e.srcElement.name).length === 0) {
        this.selectTypeOfVehicle.push(e.srcElement.name);
      }
    } else {
      if (!(this.selectTypeOfVehicle.filter(val => val === e.srcElement.name).length === 0)) {
        this.selectTypeOfVehicle = this.findAndRemoveFromArray(this.selectTypeOfVehicle, e.srcElement.name);
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

  get uniqueVendorNameList() {
    const uniqueVendorNames = [];
    this.vehicleList.forEach((val) => {
      if (uniqueVendorNames.indexOf(val['vendorName']) === -1) {
        uniqueVendorNames.push(val['vendorName']);
      }
    });
    return uniqueVendorNames;
  }

  get uniqueVehicleTypeList() {
    const uniqueVehicleType = [];
    this.vehicleList.forEach((val) => {
      if (uniqueVehicleType.indexOf(val['typeOfVehicle']) === -1) {
        uniqueVehicleType.push(val['typeOfVehicle']);
      }
    });
    return uniqueVehicleType;
  }


  clearSelectedVendorNames() {
    this.selectedVendorNames = [];
    this.searchedVendorName = null;
  }

  clearSelectedtypeOfVehicle() {
    this.selectTypeOfVehicle = [];
    this.searchedTypeOfVehicle = null;
  }


  vehicleNumberOnChange() {
    this.tableHeaderFilter = this.tableHeaderFilter.map(_ => false);
    this.selectedVendorNames = this.selectTypeOfVehicle = [];
  }

  clearAllFliter() {
    this.selectedVendorNames = [];
    this.selectTypeOfVehicle = [];
    this.searchedVehicleNumber = null;
    this.vehicleStatusSelect = undefined;
    this.vendorStatusSelect = undefined;
    this.tableHeaderFilter = this.tableHeaderFilter.map(_ => false);
  }

  vehicleStatusSelectEvent(e) {
    this.vehicleStatusSelect = e.srcElement.checked ? e.srcElement.name : undefined;
  }

  vendorStatusSelectEvent(e) {
    this.vendorStatusSelect = e.srcElement.checked ? e.srcElement.name : undefined;
  }

  isNumber(evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }
}
