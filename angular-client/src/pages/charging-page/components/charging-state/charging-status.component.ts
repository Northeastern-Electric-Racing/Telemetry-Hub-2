import { Component, Input, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import Theme from 'src/services/theme.service';
import { DataTypeEnum } from 'src/data-type.enum';
import { floatPipe } from 'src/utils/pipes.utils';

@Component({
  selector: 'charging-status',
  templateUrl: './charging-status.component.html',
  styleUrls: ['./charging-status.component.css']
})
export default class ChargingStatusComponent implements OnInit {
  @Input() displayLight: boolean = true;
  private storage = inject(Storage);
  isCharging: boolean = false;
  currentSeconds: number = 0;
  totalSeconds: number = Number(sessionStorage.getItem('charging-total-seconds')) || 0;
  intervalId!: NodeJS.Timeout;

  ngOnInit() {
    this.storage.get(DataTypeEnum.CHARGING).subscribe((value) => {
      const chargingControlValue = floatPipe(value.values[0]);
      if (this.isCharging) {
        if (chargingControlValue === 1) {
          this.isCharging = false;
          this.stopTimer();
          this.resetCurrentSecs();
        }
      } else if (chargingControlValue === 0) {
        this.isCharging = true;
        this.startTimer();
      }
    });
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.currentSeconds++;
      this.totalSeconds++;
      sessionStorage.setItem('charging-total-seconds', this.totalSeconds.toString());
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  resetCurrentSecs() {
    this.currentSeconds = 0;
  }

  getChargingState(connected: boolean) {
    return connected ? 'PAUSED' : 'NOT PAUSED';
  }

  getStateColor(isCharging: boolean) {
    return isCharging ? 'yellow' : Theme.infoBackground;
  }
}
