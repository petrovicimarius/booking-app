import { Pipe, Injectable, PipeTransform } from "@angular/core";
@Pipe({
  name: "FilterArrayByProperty",
  pure: false
})
@Injectable()
export class FilterArrayPipe implements PipeTransform {
  transform(array: any[], property: any, val: any): any {
    const type = typeof val;
    if (!array) {
      return array;
    }
    if (type === "string") {
      return array.filter(option => {
        return option[property].toLowerCase().includes(val.toLowerCase());
      });
    } else if (type === "object") {
      return array.filter(option => {});
    }
  }
}
