import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.scss']
})
export class VehicleRegistrationComponent implements OnInit {
  public startDateModel: any;
  public endDateModel: any;
  public myDatePickerOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy'
  };
  public registerForm: FormGroup;
  public submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log('inside VehicleRegistrationComponent');
    this.registerForm = this.formBuilder.group({
      vendorContact: ['', Validators.required],
      logisticsContact: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      chassisNumber: ['', Validators.required],
      typeofVehicle: ['', Validators.required],
      insuranceNumber: ['', Validators.required],
      roadWorthyNumber: ['', Validators.required],
      formCorFormA: ['', Validators.required],
      driverName: [''],
      driverContact: [''],
      licenseNumber: [''],

  });
    const d: Date = new Date();
    d.setDate(d.getDate() + 2);
    this.startDateModel = this.endDateModel = {isRange: false, singleDate: {jsDate: d}, dateRange: null};
  }

 get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    console.log(this.registerForm.value);
}
  startDateChanged(e) {
    console.log(e);
  }

  endDateChanged(e) {
    console.log(e);
  }

}
