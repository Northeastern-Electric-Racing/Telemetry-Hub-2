import { Component, Input } from '@angular/core';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';
import { NodeWithData } from 'src/utils/types.utils';

@Component({
  selector: 'fault-box',
  templateUrl: './fault-box.component.html',
  styleUrls: ['./fault-box.component.css']
})
export default class FaultBox {
  @Input() nodes: NodeWithData[] = [];
  constructor(private storage: Storage) {}

  ngOnInit() {}
}
