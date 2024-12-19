import { Component, Input, inject } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { GraphDialogComponent } from '../graph-dialog/graph-dialog.component';
import { GraphData } from 'src/utils/types.utils';

@Component({
  selector: 'info-graph',
  templateUrl: './info-graph.component.html',
  styleUrls: ['./info-graph.component.css'],
  providers: [DialogService]
})
export class InfoGraphComponent {
  public dialogService = inject(DialogService);
  @Input() data!: GraphData[];
  @Input() icon!: string;
  @Input() title!: string;
  @Input() color!: string;
  @Input() subTitle?: string;
  @Input() graphContainerId!: string;
  openDialog = () => {
    this.dialogService.open(GraphDialogComponent, {
      header: this.title,
      data: {
        data: this.data,
        color: this.color,
        title: this.title,
        subTitle: this.subTitle,
        graphContainerId: this.graphContainerId + 'big'
      }
    });
  };
}
