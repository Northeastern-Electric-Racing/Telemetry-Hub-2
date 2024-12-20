import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';
import { GraphData } from 'src/utils/types.utils';

@Component({
  selector: 'acceleration-over-time-display',
  templateUrl: './acceleration-over-time-display.component.html',
  styleUrls: ['./acceleration-over-time-display.component.css']
})
export default class AccelerationOverTimeDisplayComponent implements OnInit {
  private storage = inject(Storage);
  data: GraphData[] = [];

  ngOnInit() {
    this.storage.get(IdentifierDataType.ACCELERATION).subscribe((value) => {
      this.data.push({ x: new Date().getTime(), y: parseInt(value.values[0]) });
    });
  }
}
