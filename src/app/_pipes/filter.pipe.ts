import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], field1: string, field2: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if ((!field1 && !field2) || !value) {
      return items;
    }

    return items.filter(singleItem =>
      singleItem[field1].toLowerCase().includes(value.toLowerCase()) ||
      singleItem[field2].toLowerCase().includes(value.toLowerCase()) 
  
    );
  }
}