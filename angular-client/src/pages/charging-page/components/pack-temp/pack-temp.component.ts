import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { DataTypeEnum } from 'src/data-type.enum';
import { floatPipe } from 'src/utils/pipes.utils';

@Component({
  selector: 'pack-temp',
  templateUrl: './pack-temp.component.html',
  styleUrls: ['./pack-temp.component.css']
})
export default class PackTempComponent implements OnInit {
  private storage = inject(Storage);
  packTemp: number = 0;

  ngOnInit() {
    this.storage.get(DataTypeEnum.PACK_TEMP).subscribe((value) => {
      this.packTemp = floatPipe(value.values[0]);
    });
  }
}
