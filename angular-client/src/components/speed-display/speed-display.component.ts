import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';

@Component({
  selector: 'speed-display',
  templateUrl: './speed-display.component.html',
  styleUrls: ['./speed-display.component.css']
})
export default class SpeedDisplayComponent implements OnInit {
  private storage = inject(Storage);
  speed: number = 0;

  ngOnInit() {
    this.storage.get(IdentifierDataType.SPEED).subscribe((value) => {
      this.speed = parseInt(value.values[0]);
    });
  }
}
