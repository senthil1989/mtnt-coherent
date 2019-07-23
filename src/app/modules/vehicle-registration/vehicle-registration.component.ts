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
  public registerForm: FormGroup;
  public submitted = false;
  public vendorList: any;
  public desiredDevice: any = null;
  public capturingDeviceFound = false;
  public scannerEnabled = false;
  public deviceList: any;
  public currentDate: Date;
  public formatedCurrentDate;
  public sessonList = [];
  public selectedSesson = 4;
  public getSelectedSessonId: Number;
  public scanSuccess: Boolean = false;
  public reScanChecked: Boolean = false;
  public licenseFile: File;
  public insuranceFile: File;
  public roadWorthyFile: File;
  public formCorFormAFile: File;
  public uploadIcon = '../../../assets/images/upload-icon.png';
  public uplodDoneIcon = '../../../assets/images/uploaded.png';
  public statusChecked = true;
  public getStatusChecked: Boolean = this.statusChecked;
  public qrCodeNumber: string;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.formatedCurrentDate = `${this.currentDate.getDate()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getFullYear()}`;
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
      driverName: [''],
      driverContact: [''],
      licenseNumber: [''],

    });
    this.apiService.callGetAPI('../../../assets/json/vendorList.json').subscribe(data => {
      this.vendorList = data['vendorList'];
    });
    this.apiService.callGetAPI('../../../assets/json/sessonList.json').subscribe(data => {
      this.sessonList = data['sessonList'];
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
    this.scannerEnabled = true;
    this.desiredDevice = this.deviceList[0];
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid || (!this.getStatusChecked && (!this.insuranceFile || !this.roadWorthyFile || !this.formCorFormAFile || !this.qrCodeNumber))) {
      return;
    }
    console.log(this.registerForm.value);
    const vehicleDetails = this.registerForm.value;
    this.apiService.callPostAPI('mtnt/api/vehicle/addNewVehicle', {
      VehicleNumber : vehicleDetails.vehicleNumber,
      ChassisNumber : vehicleDetails.chassisNumber,
      TypeOfVehicle : vehicleDetails.typeOfVehicle,
      VendorContact : vehicleDetails.vendorContact,
      VendorLogisticsContact :  vehicleDetails.vendorLogisticsNumber,
      InsuranceNumber : vehicleDetails.insuranceNumber,
      RoadWorthyNumber : vehicleDetails.roadWorthyNumber,
      FormCOrANumber : vehicleDetails.formCorAnumber,
      VendorId : vehicleDetails.vendorName
    }).subscribe(data => {
      console.log(data);
    });
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
      this.qrCodeNumber = e;
      this.scanSuccess = true;
      this.closeModal('qrScanner');
    }
  }

  selectedCamera(device) {
    this.desiredDevice = this.deviceList.filter(data => data.deviceId === device.target.value)[0];
  }

  selectedSessonEvent(e) {
    console.log(e.srcElement.value);
    this.getSelectedSessonId = e.srcElement.value;
  }

  reScanChanged(e) {
    this.reScanChecked = e.srcElement.checked;
  }


  fileSelected(whichFile: string, file: File) {
    if (whichFile === 'insurance') {
      this.insuranceFile = file['path'][0].files[0];
    } else if (whichFile === 'roadWorthy') {
      this.roadWorthyFile = file['path'][0].files[0];
    } else if (whichFile === 'formCorA') {
      this.formCorFormAFile = file['path'][0].files[0];
    } else if (whichFile === 'license') {
      this.licenseFile = file['path'][0].files[0];
    }
  }

  statusChangeEvent(e) {
    this.getStatusChecked = e.srcElement.checked;
  }

  get checkStatus(): Boolean {
    return (this.insuranceFile && this.roadWorthyFile && this.formCorFormAFile && this.qrCodeNumber) ? true : false;
  }
}
