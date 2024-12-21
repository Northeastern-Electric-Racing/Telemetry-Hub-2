import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { DataTypeEnum } from 'src/data-type.enum';
import { floatPipe } from 'src/utils/pipes.utils';

@Component({
  selector: 'current-display',
  templateUrl: './current-display.component.html',
  styleUrls: ['./current-display.component.css']
})
export default class CurrentDisplayComponent implements OnInit {
  private storage = inject(Storage);
  amps: number = 0;

  ngOnInit() {
    this.storage.get(DataTypeEnum.CURRENT).subscribe((value) => {
      this.amps = floatPipe(value.values[0]);
    });
  }
}
