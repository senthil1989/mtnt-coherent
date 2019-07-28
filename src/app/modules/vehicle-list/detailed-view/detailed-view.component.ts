import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { VehicleList } from '../vehicle-list-interface/vehicle-list.interface';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss']
})
export class DetailedViewComponent implements OnInit {
  @Input() vehicleList: VehicleList[];
  @Input() vehicleDetailIndex: number;
  @Output() detailedViewCloseEvent = new EventEmitter();
  public vehicle: VehicleList;
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
