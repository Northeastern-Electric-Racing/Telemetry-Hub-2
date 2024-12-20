import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';

@Component({
  selector: 'viewer-display',
  templateUrl: './viewer-display.component.html',
  styleUrl: './viewer-display.component.css'
})
export class ViewerDisplayComponent implements OnInit {
  private storage = inject(Storage);
  numViewers: number = 0;

  ngOnInit() {
    this.storage.get(IdentifierDataType.VIEWERS).subscribe((value) => {
      this.numViewers = parseInt(value.values[0]);
    });
  }
}
