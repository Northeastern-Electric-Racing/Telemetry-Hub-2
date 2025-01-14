import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { DataTypeEnum } from 'src/data-type.enum';
import { decimalPipe } from 'src/utils/pipes.utils';
import { GraphData } from 'src/utils/types.utils';

/**
 * Component that displays acceleration data from the storage service
 * onto graphs
 *
 */

@Component({
  selector: 'acceleration-graphs',
  templateUrl: './acceleration-graphs.component.html',
  styleUrls: ['./acceleration-graphs.component.css']
})
export class AccelerationGraphsComponent implements OnInit {
  private storage = inject(Storage);
  xData: GraphData[] = [];
  yData: GraphData[] = [];

  xMax: number = 0;
  yMax: number = 0;

  maxDataPoints = 400;

  ngOnInit() {
    this.storage.get(DataTypeEnum.XYZAccel).subscribe((value) => {
      const x1 = decimalPipe(value.values[0]);
      const y1 = decimalPipe(value.values[1]);
      const time = +value.time;
      this.xData.push({
        x: time,
        y: x1
      });

      this.yData.push({
        x: time,
        y: y1
      });

      //checks if there is a new max
      this.xMax = Math.max(Math.abs(x1), this.xMax);
      this.yMax = Math.max(Math.abs(y1), this.yMax);
    });
  }
}
