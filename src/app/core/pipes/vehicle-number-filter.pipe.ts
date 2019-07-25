import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehicleNumberFilter',
  pure: false
})
export class VehicleNumberFilterPipe implements PipeTransform {

  transform(value: any, selectedVendorNames: string[], searchedVehicleNumber: number): [] {
    if (searchedVehicleNumber) {
      return value.filter(val => val.vehicleNumber.startsWith(searchedVehicleNumber));
    } else {
      if (selectedVendorNames.length > 0) {
      return value.filter(val => selectedVendorNames.indexOf(val.vendorname) === -1 );
      } else {
        return value;
      }
    }
  }

}
