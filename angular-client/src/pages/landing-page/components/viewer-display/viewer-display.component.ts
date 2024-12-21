import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { DataTypeEnum } from 'src/data-type.enum';

@Component({
  selector: 'viewer-display',
  templateUrl: './viewer-display.component.html',
  styleUrl: './viewer-display.component.css'
})
export class ViewerDisplayComponent implements OnInit {
  private storage = inject(Storage);
  numViewers: number = 0;

  ngOnInit() {
    this.storage.get(DataTypeEnum.VIEWERS).subscribe((value) => {
      this.numViewers = parseInt(value.values[0]);
    });
  }
}
