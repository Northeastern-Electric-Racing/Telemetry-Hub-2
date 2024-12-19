import { Component, Input, inject } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { GraphData } from 'src/utils/types.utils';

@Component({
  selector: 'graph-dialog',
  templateUrl: './graph-dialog.component.html',
  providers: [DialogService]
})
export class GraphDialogComponent {
  public dialogService = inject(DialogService);
  public config = inject(DynamicDialogConfig);
  @Input() data!: GraphData[];
  @Input() color!: string;
  @Input() title!: string;
  @Input() graphContainerId!: string;

  constructor() {
    this.data = this.config.data.data;
    this.color = this.config.data.color;
    this.title = this.config.data.title;
    this.graphContainerId = this.config.data.graphContainerId;
  }
}
