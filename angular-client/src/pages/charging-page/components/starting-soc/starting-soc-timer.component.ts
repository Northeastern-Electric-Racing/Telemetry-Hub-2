import { Component, inject } from '@angular/core';
import { take } from 'rxjs';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';
import { floatPipe } from 'src/utils/pipes.utils';

@Component({
  selector: 'starting-soc-timer',
  templateUrl: './starting-soc-timer.component.html',
  styleUrls: ['./starting-soc-timer.component.css']
})
export default class StartingSocTimerComponent {
  private storage = inject(Storage);
  startingSoc: number = 0;
  constructor() {
    this.storage
      .get(IdentifierDataType.STATE_OF_CHARGE)
      .pipe(take(1))
      .subscribe((value) => {
        this.startingSoc = floatPipe(value.values[0]);
      });
  }
}
