import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataValue } from 'src/utils/socket.utils';
import { DataType, Run } from 'src/utils/types.utils';

@Component({
  selector: 'graph-caption',
  styleUrls: ['./graph-caption.component.css'],
  templateUrl: './graph-caption.component.html'
})
export default class GraphInfoComponent implements OnInit {
  @Input() dataType!: Subject<DataType>;
  @Input() currentValue!: Subject<DataValue | undefined>;
  @Input() onRunSelected!: (run: Run) => void;
  @Input() onClearDataType!: () => void;
  @Input() onSetRealtime!: () => void;
  @Input() run?: Run;
  dataTypeName?: string | string[];
  dataTypeUnit?: string | string[];
  value?: string | number;

  ngOnInit(): void {
    this.dataType.subscribe((dataType: DataType) => {
      this.dataTypeName = dataType.name;
      this.dataTypeUnit = dataType.unit;
    });
    this.currentValue.subscribe((pvalue?: DataValue) => {
      const value = pvalue?.values[0];
      this.value = value ? parseFloat(value).toFixed(2) : 'No Values';
    });
  }
}
