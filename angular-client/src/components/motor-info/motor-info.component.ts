import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { DataTypeEnum } from 'src/data-type.enum';
import { floatPipe } from 'src/utils/pipes.utils';

// need access motor temp, motor consumption, and motor cooling

@Component({
  selector: 'motor-info',
  templateUrl: './motor-info.component.html',
  styleUrls: ['./motor-info.component.css']
})
export default class MotorInfoComponent implements OnInit {
  private storage = inject(Storage);
  motorUsage: number = 100;
  coolUsage: number = 0;
  motorTemp: number = 0;

  piechartData: { value: number; name: string }[] = [];

  ngOnInit() {
    this.storage.get(DataTypeEnum.MOTOR_TEMP).subscribe((value) => {
      this.motorTemp = floatPipe(value.values[0]);
    });
    this.storage.get(DataTypeEnum.MOTOR_USAGE).subscribe((value) => {
      this.motorUsage = floatPipe(value.values[0]);
    });
    this.storage.get(DataTypeEnum.COOL_USAGE).subscribe((value) => {
      this.coolUsage = floatPipe(value.values[0]);
    });
    this.piechartData = [
      { value: this.motorUsage, name: 'Motor' },
      { value: this.coolUsage, name: 'Cooling' }
    ];
  }

  getTotalUsage(values: number[]) {
    return values.reduce((acc, value) => acc + value, 0);
  }
}
