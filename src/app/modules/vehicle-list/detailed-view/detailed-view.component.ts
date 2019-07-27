import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

interface VehicleInterface {
  vendorname: string;
  registeredDate: number;
  vehicleNumber: number;
  typeOfVehicle: string;
  vendorContact: number;
  vehicleStatus: string;
  vendorStatus: string;
}

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss']
})
export class DetailedViewComponent implements OnInit {
  @Input() vehicleList;
  @Input() vehicleDetailIndex;
  @Output() detailedViewCloseEvent = new EventEmitter();
  public vehicle: VehicleInterface;
  constructor() { }

  ngOnInit() {
    this.vehicle = this.vehicleList[this.vehicleDetailIndex];
  }

  closeTab() {
    this.detailedViewCloseEvent.emit();
  }

  prevVehicle() {
    if (this.vehicleDetailIndex > 0) {
      this.vehicle = this.vehicleList[--this.vehicleDetailIndex];
    }
  }

  nextVehicle() {
    if (this.vehicleDetailIndex + 1 < this.vehicleList.length) {
    this.vehicle = this.vehicleList[++this.vehicleDetailIndex];
  }
  }
}
