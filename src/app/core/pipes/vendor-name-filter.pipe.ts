import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vendorNameFilter',
  pure: false
})
export class VendorNameFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args) {
      return value.filter(val => val.toLowerCase().startsWith(args.toLowerCase()) || val.toLowerCase().endsWith(args.toLowerCase()));
    } else {
      return value;
    }
  }

}
