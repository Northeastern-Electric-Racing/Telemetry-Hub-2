import { Component, Input, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { DataTypeEnum } from 'src/data-type.enum';

@Component({
  selector: 'latency-display',
  templateUrl: './latency-display.html',
  styleUrls: ['./latency-display.css']
})
export default class LatencyDisplayComponent implements OnInit {
  private storage = inject(Storage);
  @Input() lowVal: number = 0;
  @Input() medVal: number = 50;
  @Input() highVal: number = 100;
  latency: number = 0;
  newLatency: number = 0;

  ngOnInit(): void {
    this.storage.get(DataTypeEnum.LATENCY).subscribe((value) => {
      this.latency = parseInt(value.values[0]);
    });
    this.storage.get(DataTypeEnum.NEW_LATENCY).subscribe((value) => {
      this.newLatency = parseInt(value.values[0]);
    });
  }

  mapColor = (latency: number, medVal: number): string => {
    if (latency < (3 * medVal) / 4) {
      return '#53e400';
    }
    if (latency > (3 * medVal) / 4 && latency < (3 * medVal) / 2) {
      return 'yellow';
    }
    return 'red';
  };
}
