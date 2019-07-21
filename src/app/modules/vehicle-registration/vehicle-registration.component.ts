import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../../core/services/api.service';
import { ModalService } from '../../core/services/model.service';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.scss']
})
export class VehicleRegistrationComponent implements OnInit {
  public startDateModel: any;
  public endDateModel: any;
  public myDatePickerOptions1 = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    stylesData: {
      selector: 'dp1',
      styles: `
                .dp1 {
                    position: absolute !important;
                    top : 0px;
                    left : -121px;
                }`
    }
  };
  public myDatePickerOptions2 = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    stylesData: {
      selector: 'dp1',
      styles: `
                .dp1 {
                    position: absolute !important;
                    top : 0px;
                    left : -120px;
                }`
    },
    disableUntil: {}
  };
  public registerForm: FormGroup;
  public submitted = false;
  public vendorList: any;
  public selectedEndDate: Date;
  public selectedStartDate: Date;
  public desiredDevice: any = null;
  public capturingDeviceFound = false;
  public scannerEnabled = false;
  public deviceList: any;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      vendorName: ['', Validators.required],
      vendorContact: ['', [Validators.required, Validators.minLength(0)]],
      vendorLogisticsNumber: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(20)]],
      vehicleNumber: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(45)]],
      chassisNumber: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(45)]],
      typeOfVehicle: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(20)]],
      insuranceNumber: ['', [Validators.required, Validators.minLength(0)]],
      roadWorthyNumber: ['', [Validators.required, Validators.minLength(0)]],
      formCorAnumber: ['', [Validators.required, Validators.minLength(0)]],
      qrCodeNumber: ['', [Validators.required]],
      driverName: [''],
      driverContact: [''],
      licenseNumber: [''],

    });
    this.initDateModesls(new Date());
    this.apiService.callGetAPI('../../../assets/json/vendorList.json').subscribe(data => {
      this.vendorList = data['vendorList'];
    });

  }

  openModal(id: string) {
    this.modalService.open(id);
    this.scannerEnabled = true;
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.desiredDevice = {
      deviceId: '',
      groupId: '',
      kind: '',
      label: ''
    };
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);
  }

  initDateModesls(date: Date) {
    this.selectedStartDate = new Date();
    this.startDateModel = { isRange: false, singleDate: { jsDate: this.selectedStartDate }, dateRange: null };
    const d: Date = date;
    d.setDate(d.getDate() + 2);
    this.selectedEndDate = d;
    this.endDateModel = { isRange: false, singleDate: { jsDate: this.selectedEndDate }, dateRange: null };
  }
  startDateChanged(e) {
    if (e.singleDate.jsDate > this.selectedEndDate) {
      this.initDateModesls(e.singleDate.jsDate);
    }
    this.endDateDisable(e.singleDate.date.year, e.singleDate.date.month, e.singleDate.date.day);
    this.selectedStartDate = e.singleDate.jsDate;
  }

  endDateChanged(e) {
    this.selectedEndDate = e.singleDate.jsDate;
  }

  endDateDisable(year: number, month: number, day: number) {
    this.myDatePickerOptions2.disableUntil['year'] = year;
    this.myDatePickerOptions2.disableUntil['month'] = month;
    this.myDatePickerOptions2.disableUntil['day'] = day;
  }

  camerasFoundHandler(e) {
    if (e) {
      this.deviceList = e;
      this.capturingDeviceFound = true;
    }
  }
  camerasNotFoundHandler(e) {
    if (e) {
      this.capturingDeviceFound = false;
    }
  }

  scanSuccessHandler(e) {
    if (e) {
      this.registerForm.patchValue({
        qrCodeNumber: e
      });
      this.closeModal('qrScanner');
    }
  }

  selectedCamera(device) {
    this.desiredDevice = this.deviceList.filter(data => data.deviceId === device.target.value)[0];
  }
}
