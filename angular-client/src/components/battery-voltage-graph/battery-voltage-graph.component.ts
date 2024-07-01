import { Component, OnInit } from '@angular/core';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';
import { GraphData } from 'src/utils/types.utils';

@Component({
  selector: 'battery-voltage-graph',
  templateUrl: './battery-voltage-graph.component.html',
  styleUrls: ['./battery-voltage-graph.component.css']
})
export default class BatteryVoltageGraph implements OnInit {
  data: GraphData[] = [];
  maxDataPoints = 100;

  constructor(private storage: Storage) {}
  ngOnInit() {
    this.storage.get(IdentifierDataType.VOLTAGE).subscribe((value) => {
      this.data.push({ x: new Date().getTime(), y: parseInt(value.values[0]) });
      if (this.data.length >= 100) {
        this.data.shift();
      }
    });
  }
}
