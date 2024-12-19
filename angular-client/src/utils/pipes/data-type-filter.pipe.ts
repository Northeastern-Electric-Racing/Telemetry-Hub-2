import { Pipe, PipeTransform } from '@angular/core';
import { DataType } from '../types.utils';

@Pipe({
  name: 'dataTypeFilter'
})
export class DataTypeFilterPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(data: DataType[] | null, filterProperty: string, filter: string, nodeName: string): any[] {
    const filterValue = filter.toLowerCase();

    return data
      ? filterValue
        ? data.filter(
            (item) => item.name.toLowerCase().includes(filterValue) || nodeName.toLowerCase().includes(filterValue)
          )
        : data
      : [];
  }
}
