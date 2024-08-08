import { Component, OnInit } from '@angular/core';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';
import { GraphData } from 'src/utils/types.utils';

@Component({
  selector: 'pack-voltage-graph',
  templateUrl: './pack-voltage-graph.component.html',
  styleUrls: ['./pack-voltage-graph.component.css']
})
export default class PackVoltageGraph implements OnInit {
  packVoltData: GraphData[] = [];
  maxDataPoints = 100;

  constructor(private storage: Storage) {}
  ngOnInit() {
    this.storage.get(IdentifierDataType.PACK_VOLTAGE).subscribe((value) => {
      this.packVoltData.push({ x: new Date().getTime(), y: parseInt(value.values[0]) });
      if (this.packVoltData.length >= 100) {
        this.packVoltData.shift();
      }
    });
  }
}