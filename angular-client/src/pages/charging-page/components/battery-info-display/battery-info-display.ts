import { Component, HostListener, OnInit, inject } from '@angular/core';
import { DataTypeEnum } from 'src/data-type.enum';
import { floatPipe } from 'src/utils/pipes.utils';
import Storage from 'src/services/storage.service';

@Component({
  selector: 'battery-info-display',
  templateUrl: './battery-info-display.html',
  styleUrls: ['./battery-info-display.css']
})
export class BatteryInfoDisplayComponent implements OnInit {
  private storage = inject(Storage);
  voltage: number = 0;
  packTemp: number = 0;
  stateOfCharge: number = 0;
  chargeCurrentLimit: number = 0;
  dischargeCurrentLimit: number = 0;
  mobileThreshold = 768;
  isMobile = window.innerWidth < this.mobileThreshold;

  ngOnInit() {
    this.storage.get(DataTypeEnum.PACK_TEMP).subscribe((value) => {
      this.packTemp = floatPipe(value.values[0]);
    });
    this.storage.get(DataTypeEnum.PACK_VOLTAGE).subscribe((value) => {
      this.voltage = floatPipe(value.values[0]);
    });
    this.storage.get(DataTypeEnum.STATE_OF_CHARGE).subscribe((value) => {
      this.stateOfCharge = floatPipe(value.values[0]);
    });
    this.storage.get(DataTypeEnum.CHARGE_CURRENT_LIMIT).subscribe((value) => {
      this.chargeCurrentLimit = floatPipe(value.values[0]);
    });
    this.storage.get(DataTypeEnum.DISCHARGE_CURRENT_LIMIT).subscribe((value) => {
      this.dischargeCurrentLimit = floatPipe(value.values[0]);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= this.mobileThreshold;
  }
}
