import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vendorNameFilter'
})
export class VendorNameFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args) {
      return value.filter(val => val.vendorname.toLowerCase().startsWith(args.toLowerCase()) || val.vendorname.toLowerCase().endsWith(args.toLowerCase()));
    } else {
      return value;
    }
  }

}
