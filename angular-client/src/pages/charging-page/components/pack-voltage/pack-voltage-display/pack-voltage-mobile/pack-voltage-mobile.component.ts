import { Component, Input, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { GraphData } from 'src/utils/types.utils';

@Component({
  selector: 'pack-voltage-mobile',
  templateUrl: './pack-voltage-mobile.component.html',
  styleUrls: ['./pack-voltage-mobile.component.css']
})
export default class PackVoltageMobileDisplayComponent {
  private storage = inject(Storage);
  @Input() voltage: number = 0;
  @Input() packVoltData: GraphData[] = [];
  resetGraphButton = {
    onClick: () => {
      this.packVoltData = [];
    },
    icon: 'restart_alt'
  };
}
