import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehicleNumberFilter'
})
export class VehicleNumberFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args) {
      return value.filter(val => val.vehicleNumber.startsWith(args));
    } else {
      return value;
    }
  }

}
