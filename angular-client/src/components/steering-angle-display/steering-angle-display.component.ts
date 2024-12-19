import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';
import { floatPipe } from 'src/utils/pipes.utils';

/**
 * Component that displays a percentage using a ring that is colored
 * a percentage of the way according to what percentage is passed
 */

@Component({
  selector: 'steering-angle-display',
  templateUrl: './steering-angle-display.component.html',
  styleUrls: ['./steering-angle-display.component.css']
})
export class SteeringAngleDisplayComponent implements OnInit {
  private storage = inject(Storage);
  steeringAngle: number = 0;

  ngOnInit() {
    this.storage.get(IdentifierDataType.STEERING_ANGLE).subscribe((value) => {
      this.steeringAngle = floatPipe(value.values[0]);
    });
  }
}
