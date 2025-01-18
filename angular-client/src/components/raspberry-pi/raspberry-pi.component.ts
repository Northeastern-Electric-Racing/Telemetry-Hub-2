import { Component, HostListener, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { DataTypeEnum } from 'src/data-type.enum';
import { floatPipe } from 'src/utils/pipes.utils';

@Component({
  selector: 'raspberry-pi',
  templateUrl: './raspberry-pi.component.html',
  styleUrls: ['./raspberry-pi.component.css']
})
export default class RasberryPiComponent implements OnInit {
  private storage = inject(Storage);
  cpuUsage: number = 0;
  cpuTemp: number = 0;
  ramUsage: number = 0;
  wifiRSSI: number = 0;
  mcs: number = 0;

  mobileThreshold = 768;
  isMobile = window.innerWidth < this.mobileThreshold;

  ngOnInit() {
    this.storage.get(DataTypeEnum.CPUUsage).subscribe((value) => {
      this.cpuUsage = floatPipe(value.values[0]);
    });
    this.storage.get(DataTypeEnum.CPUTemp).subscribe((value) => {
      this.cpuTemp = floatPipe(value.values[0]);
    });
    this.storage.get(DataTypeEnum.RAMUsage).subscribe((value) => {
      this.ramUsage = Math.round((1 - floatPipe(value.values[0]) / 8000) * 100);
    });
    this.storage.get(DataTypeEnum.WIFIRSSI).subscribe((value) => {
      this.wifiRSSI = floatPipe(value.values[0]);
    });
    this.storage.get(DataTypeEnum.MCS).subscribe((value) => {
      this.mcs = floatPipe(value.values[0]);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= this.mobileThreshold;
  }
}
