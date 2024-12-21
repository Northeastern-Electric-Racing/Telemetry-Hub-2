import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { DataTypeEnum } from 'src/data-type.enum';

@Component({
  selector: 'brake-pressure-display',
  templateUrl: './brake-pressure-display.component.html',
  styleUrls: ['./brake-pressure-display.component.css']
})
export default class BrakePressureDisplayComponent implements OnInit {
  private storage = inject(Storage);
  brakePressure: number = 0;

  ngOnInit() {
    this.storage.get(DataTypeEnum.BRAKE_PRESSURE).subscribe((value) => {
      this.brakePressure = parseInt(value.values[0]);
    });
  }
}
