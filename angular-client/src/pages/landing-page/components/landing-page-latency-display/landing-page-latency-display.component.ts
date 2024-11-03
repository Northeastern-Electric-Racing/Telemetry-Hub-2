import { Component, Input, OnInit } from '@angular/core';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';

@Component({
  selector: 'landing-page-latency-display',
  templateUrl: './landing-page-latency-display.component.html',
  styleUrl: './landing-page-latency-display.component.css'
})
export default class LandingPageLatencyDisplay implements OnInit {
  @Input() lowVal: number = 0;
  @Input() medVal: number = 50;
  @Input() highVal: number = 100;
  latency: number = 0;
  newLatency: number = 0;

  constructor(private storage: Storage) {}

  ngOnInit(): void {
    this.storage.get(IdentifierDataType.LATENCY).subscribe((value) => {
      this.latency = parseInt(value.values[0]);
    });
    this.storage.get(IdentifierDataType.NEW_LATENCY).subscribe((value) => {
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