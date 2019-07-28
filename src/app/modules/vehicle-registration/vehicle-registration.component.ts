import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../../core/services/api.service';
import { ModalService } from '../../core/services/model.service';
import { RegisteredForm, DriverDetails } from './vehicle-registration-interface/vehicle-registration.interface';


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
  public insuranceDownloadUrl: SafeHtml;
  public roadWorthyDownloadUrl: SafeHtml;
  public formCorFormADownloadUrl: SafeHtml;
  public licenseDownloadUrl: SafeHtml;
  public showLoader = false;
  public registeredFormFinal: RegisteredForm;
  public driverDetails: DriverDetails;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private modalService: ModalService,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private toasterService: ToastrService) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.formatedCurrentDate = `${this.currentDate.getDate()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getFullYear()}`;
    this.registerForm = this.formBuilder.group({
      vehicleNumber: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(45)]],
      chassisNumber: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(45)]],
      QRCode: ['', [Validators.minLength(0)]],
      typeOfVehicle: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(20)]],
      insuranceNumber: ['', [Validators.required, Validators.minLength(0)]],
      roadWorthyNumber: ['', [Validators.required, Validators.minLength(0)]],
      formCorANumber: ['', [Validators.required, Validators.minLength(0)]],
      vendorContact: ['', [Validators.required, Validators.minLength(0)]],
      vendorAddress: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(20)]],
      transportOfficerName: ['', [Validators.required, Validators.minLength(0)]],
      transportOfficerContact: ['', [Validators.required, Validators.minLength(0)]],
      capacityOfVehicle: ['', [Validators.required, Validators.minLength(0)]],
      createdBy: ['coherent', [Validators.required, Validators.minLength(0)]],
      modifiedBy: [''],
      modifiedTime: [''],
      createdTime: ['', [Validators.required, Validators.minLength(0)]],
      seasonID: ['1', [Validators.required, Validators.minLength(0)]],
      vendorID: ['', [Validators.required, Validators.minLength(0)]],
      status: ['BLOCK', [Validators.required, Validators.minLength(0)]],
      QRCodeRescan: ['N', [Validators.required, Validators.minLength(0)]],
      softDelete: ['0', [Validators.required, Validators.minLength(0)]],
      blockID: ['1', [Validators.required, Validators.minLength(0)]],
      driverName: [''],
      driverPhone: [''],
      driverLicenseNumber: [''],
    });
    this.vendorList = [
      {
        id: '1',
        name: 'Vendor 1'
      },
      {
        id: '2',
        name: 'Vendor 2'
      },
      {
        id: '3',
        name: 'Vendor 3'
      },
      {
        id: '4',
        name: 'Vendor 4'
      },
      {
        id: '5',
        name: 'Vendor 5'
      },
      {
        id: '6',
        name: 'Vendor 6'
      },
      {
        id: '7',
        name: 'Vendor 7'
      }
    ];
    this.sessonList = [
      {
        id: '1',
        name: 'Aug 2010 - Jul 2011'
      },
      {
        id: '2',
        name: 'Aug 2011 - Jul 2012'
      },
      {
        id: '3',
        name: 'Aug 2012 - Jul 2013'
      },
      {
        id: '4',
        name: 'Aug 2013 - Jul 2014'
      },
      {
        id: '5',
        name: 'Aug 2014 - Jul 2015'
      },
      {
        id: '6',
        name: 'Aug 2015 - Jul 2016'
      },
      {
        id: '7',
        name: 'Aug 2016 - Jul 2017'
      },
      {
        id: '7',
        name: 'Aug 2017 - Jul 2018'
      },
      {
        id: '7',
        name: 'Aug 2018 - Jul 2019'
      }
    ];
    // this.apiService.callGetAPI('../../../assets/json/vendorList.json').subscribe(data => {
    //   this.vendorList = data['vendorList'];
    // });
    // this.apiService.callGetAPI('../../../assets/json/sessonList.json').subscribe(data => {
    //   this.sessonList = data['sessonList'];
    // });
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
    const currentTimeStamp = Math.round(new Date().getTime() / 1000);
    this.registerForm.controls['createdTime'].setValue(currentTimeStamp);
    this.submitted = true;
    if (this.registerForm.invalid || (!this.getStatusChecked && (!this.insuranceFile || !this.roadWorthyFile || !this.formCorFormAFile || !this.qrCodeNumber))) {
      return;
    }
    this.showLoader = true;
    this.registeredFormFinal = this.registerForm.value;
    this.apiRequestToNewVehicle(this.registeredFormFinal);
  }

  apiRequestToNewVehicle(registeredFormFinal: RegisteredForm) {
    this.apiService.callPostAPI('addNewVehicle', registeredFormFinal).subscribe(data => {
      if (data['statusCode'] === '1') {
        if (this.registeredFormFinal.driverLicenseNumber || this.registeredFormFinal.driverName || this.registeredFormFinal.driverPhone) {
          this.apiRequestToDriverDetails(this.updateDriverDetails(registeredFormFinal, data['vehicleID']));
        } else {
          this.successService('Vehicle Registered Successfully');
        }
      } else {
        this.errorService('Vehicle not Registered, Please register again!');
      }
    }, error => {
      this.errorService('Unable to connect with server, Please try again!');
    });
  }

  apiRequestToDriverDetails(driverDetails: DriverDetails) {
    this.apiService.callPostAPI('addDriverDetails', driverDetails).subscribe(data => {
      if (data['statusCode'] === '1') {
        this.successService('Vehicle Registered Successfully');
      } else {
        this.errorService('Vehicle not Registered, Please register again!');
      }
    }, error => {
      this.errorService('Unable to connect with server, Please try again!');
    });
  }

  successService(successMsg: string) {
    this.showLoader = false;
    this.toasterService.success(successMsg);
    this.router.navigate(['/vehicleList']);
  }

  errorService(errMsg: string) {
    this.showLoader = false;
    this.toasterService.error(errMsg);
  }

  updateDriverDetails(formValue: RegisteredForm, vehicleID: number): DriverDetails {
    this.driverDetails = {
      driverName: formValue.driverName,
      driverPhone: formValue.driverPhone,
      driverLicenseNumber: formValue.driverLicenseNumber,
      vehicleID
    };
    return this.driverDetails;
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
      this.registerForm.controls['QRCode'].setValue(this.qrCodeNumber);
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
      this.insuranceDownloadUrl = this.sanitizeUrl(URL.createObjectURL(this.insuranceFile));
    } else if (whichFile === 'roadWorthy') {
      this.roadWorthyFile = file['path'][0].files[0];
      this.roadWorthyDownloadUrl = this.sanitizeUrl(URL.createObjectURL(this.roadWorthyFile));
    } else if (whichFile === 'formCorA') {
      this.formCorFormAFile = file['path'][0].files[0];
      this.formCorFormADownloadUrl = this.sanitizeUrl(URL.createObjectURL(this.formCorFormAFile));
    } else if (whichFile === 'license') {
      this.licenseFile = file['path'][0].files[0];
      this.licenseDownloadUrl = this.sanitizeUrl(URL.createObjectURL(this.licenseFile));
    }
    }

  statusChangeEvent(e) {
    this.getStatusChecked = e.srcElement.checked;
  }

  get checkStatus(): Boolean {
    return (this.insuranceFile && this.roadWorthyFile && this.formCorFormAFile && this.qrCodeNumber) ? true : false;
  }

  sanitizeUrl(url): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  navigateTo(navigateurl: string) {
    this.router.navigate([navigateurl]);
  }
}
