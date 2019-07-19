import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.scss']
})
export class VehicleRegistrationComponent implements OnInit {
  public startDate: any;
  public endDate: any;
  constructor() { }

  ngOnInit() {
    console.log('inside VehicleRegistrationComponent');
  }

}
