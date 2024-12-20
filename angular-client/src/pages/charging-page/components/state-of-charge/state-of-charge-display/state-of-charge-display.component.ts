import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';
import { floatPipe } from 'src/utils/pipes.utils';

@Component({
  selector: 'state-of-charge-display',
  templateUrl: './state-of-charge-display.component.html',
  styleUrls: ['./state-of-charge-display.component.css']
})
export default class StateOfChargeDisplayComponent implements OnInit {
  private storage = inject(Storage);
  stateOfCharge: number = 0;

  ngOnInit() {
    this.storage.get(IdentifierDataType.STATE_OF_CHARGE).subscribe((value) => {
      this.stateOfCharge = floatPipe(value.values[0]);
    });
  }
}
