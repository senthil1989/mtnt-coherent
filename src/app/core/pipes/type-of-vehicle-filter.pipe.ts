import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeOfVehicleFilter'
})
export class TypeOfVehicleFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args) {
      return value.filter(val => val.typeOfVehicle.toLowerCase().startsWith(args.toLowerCase()));
    } else {
      return value;
    }
  }

}
