import { Pipe, Injectable, PipeTransform } from "@angular/core";
@Pipe({
  name: "FilterArrayByProperty",
  pure: false
})
@Injectable()
export class FilterArrayPipe implements PipeTransform {
  transform(array: any[], property: any, val: any): any {
    // For now It's used only as string on language component
    const type = typeof val;
    if (!array) {
      return array;
    }
    console.log(array);
    console.log(property);
    console.log(val);
    // @TODO Change filter to accept more than one property if need
    // All other functionalities we will need should be added here
    if (type === "string") {
      return array.filter(option => {
        console.log(option[property].toLowerCase().includes(val.toLowerCase()));
        // debugger
        return option[property].toLowerCase().includes(val.toLowerCase());
      });
    } else if (type === "object") {
      return array.filter(option => {
        // debugger;
        for (const key in option) {
          // option[property]
          // console.log(key);
        }
        // return option[property]
        // 	.toLowerCase()
        // 	.includes(val.toLowerCase());
      });
    }
  }
}
