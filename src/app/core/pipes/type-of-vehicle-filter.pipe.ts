import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeOfVehicleFilter',
  pure: false
})
export class TypeOfVehicleFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args) {
      return value.filter(val => val.toLowerCase().startsWith(args.toLowerCase()));
    } else {
      return value;
    }
  }

}
