import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { DataTypeEnum } from 'src/data-type.enum';

@Component({
  selector: 'torque-display',
  templateUrl: './torque-display.component.html',
  styleUrls: ['./torque-display.component.css']
})
export default class TorqueDisplayComponent implements OnInit {
  private storage = inject(Storage);
  torque: number = 0;

  ngOnInit() {
    this.storage.get(DataTypeEnum.TORQUE).subscribe((value) => {
      this.torque = parseInt(value.values[0]);
    });
  }
}
