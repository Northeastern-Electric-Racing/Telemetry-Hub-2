import { Pipe, PipeTransform } from '@angular/core';
import { NodeWithVisibilityToggle } from '../types.utils';

@Pipe({
  name: 'nodeFilter'
})
export class NodeFilterPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(data: NodeWithVisibilityToggle[] | null, filterProperty: string, filter: string): any[] {
    const filterValue = filter.toLowerCase();

    return data
      ? filterValue
        ? data.filter(
            (item) =>
              item.name.toLowerCase().includes(filterValue) ||
              item.dataTypes
                .map((dataType) => dataType.name.toLowerCase())
                .some((dataTypeName) => dataTypeName.includes(filterValue))
          )
        : data
      : [];
  }
}
