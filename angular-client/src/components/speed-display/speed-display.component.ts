import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { DataTypeEnum } from 'src/data-type.enum';

@Component({
  selector: 'speed-display',
  templateUrl: './speed-display.component.html',
  styleUrls: ['./speed-display.component.css']
})
export default class SpeedDisplayComponent implements OnInit {
  private storage = inject(Storage);
  speed: number = 0;

  ngOnInit() {
    this.storage.get(DataTypeEnum.SPEED).subscribe((value) => {
      this.speed = parseInt(value.values[0]);
    });
  }
}
