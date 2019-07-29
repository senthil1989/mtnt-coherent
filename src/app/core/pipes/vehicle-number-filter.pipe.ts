import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehicleNumberFilter',
  pure: false
})
export class VehicleNumberFilterPipe implements PipeTransform {
  public finalValue: object[];
  transform(value: any, selectTypeOfVehicle: string[], selectedVendorNames: string[], vehicleStatusSelect: string, vendorStatusSelect: string, searchedVehicleNumber: number): object[] {
    this.finalValue = searchedVehicleNumber ? value.filter(val => val.vehicleNumber.startsWith(searchedVehicleNumber)) : value;
    return this.customizedReturn(this.finalValue, selectTypeOfVehicle, selectedVendorNames, vehicleStatusSelect, vendorStatusSelect);
  }

  customizedReturn(value: any, selectTypeOfVehicle: string[], selectedVendorNames: string[], vehicleStatusSelect: string, vendorStatusSelect: string) {
    if (selectedVendorNames.length > 0 || selectTypeOfVehicle.length > 0 || vehicleStatusSelect || vendorStatusSelect) {
      return this.getFilteredVendorStatus(
        this.getFilteredVehicleStatus(
          this.getUniqueTypeOfVehicleFromTwoArrays(
            this.getUniqueVendorNameFromTwoArrays(value, selectedVendorNames),
            selectTypeOfVehicle), vehicleStatusSelect),
        vendorStatusSelect);
    } else {
      return value;
    }
  }

  getFilteredVehicleStatus(value: object[], vehicleStatusSelect: string) {
    if (vehicleStatusSelect) {
      return value.filter(val => val['status'].toLowerCase() === vehicleStatusSelect.toLowerCase());
    } else {
      return value;
    }
  }

  getFilteredVendorStatus(value: object[], vendorStatusSelect: string) {
    if (vendorStatusSelect) {
      return value.filter(val => val['softDelete'].toLowerCase() === vendorStatusSelect.toLowerCase());
    } else {
      return value;
    }
  }

  getUniqueVendorNameFromTwoArrays(arr1, arr2) {
    const finalArray = [];
    arr1.forEach(element1 => {
      arr2.forEach(element2 => {
        if (element1.vendorName === element2) {
          finalArray.push(element1);
        }
      });
    });
  return finalArray.length > 0 ? finalArray : arr1;
  }

  getUniqueTypeOfVehicleFromTwoArrays(arr1, arr2) {
    const finalArray = [];
    arr1.forEach(element1 => {
      arr2.forEach(element2 => {
        if (element1.typeOfVehicle === element2) {
          finalArray.push(element1);
        }
      });
    });
  return finalArray.length > 0 ? finalArray : arr1;
  }
}
