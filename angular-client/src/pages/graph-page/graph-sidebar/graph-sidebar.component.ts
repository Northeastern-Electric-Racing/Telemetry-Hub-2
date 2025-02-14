import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DataType, Run } from 'src/utils/types.utils';

/**
 * Sidebar component wrapper that determines to display mobile or desktop sidebar.
 * @param nodes The nodes to display on the sidebar.
 * @param selectDataType The function to call when a data type is selected.
 */
@Component({
  selector: 'graph-sidebar',
  templateUrl: './graph-sidebar.component.html',
  styleUrls: ['./graph-sidebar.component.css']
})
export default class GraphSidebarComponent implements OnInit {
  @Input() dataTypes!: DataType[];
  @Input() selectDataType!: (dataType: DataType) => void;
  @Input() onRunSelected!: (run: Run) => void;

  isMobile!: boolean;

  mobileThreshold = 768;

  ngOnInit() {
    this.isMobile = window.innerWidth <= this.mobileThreshold;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= this.mobileThreshold;
  }
}
