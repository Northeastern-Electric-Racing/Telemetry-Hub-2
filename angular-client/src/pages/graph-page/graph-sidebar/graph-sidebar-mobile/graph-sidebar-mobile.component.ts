import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { dataTypeNamePipe, dataTypesToNodes } from 'src/utils/dataTypes.utils';
import { DataType, Node, NodeWithVisibilityToggle, Run } from 'src/utils/types.utils';

@Component({
  selector: 'graph-sidebar-mobile',
  templateUrl: './graph-sidebar-mobile.component.html',
  styleUrls: ['./graph-sidebar-mobile.component.css'],
  animations: [
    trigger('toggleCardExpand', [
      transition(':enter', [
        style({
          width: 0,
          opacity: 0
        }),
        animate(
          '400ms',
          style({
            width: '*',
            opacity: 1
          })
        )
      ]),
      transition(':leave', [
        animate(
          '400ms',
          style({
            width: 0,
            opacity: 0
          })
        )
      ])
    ]),
    trigger('toggleSidebar', [
      transition(':enter', [
        style({
          height: 0,
          opacity: 0
        }),
        animate(
          '400ms',
          style({
            height: '*',
            opacity: 1
          })
        )
      ]),
      transition(':leave', [
        animate(
          '400ms',
          style({
            height: 0,
            opacity: 0
          })
        )
      ])
    ])
  ]
})
export default class GraphSidebarMobileComponent implements OnInit {
  @Input() dataTypes!: DataType[];
  @Input() selectDataType!: (dataType: DataType) => void;
  @Input() onRunSelected!: (run: Run) => void;
  nodesWithVisibilityToggle!: NodeWithVisibilityToggle[];
  showSelection = false;
  nodes!: Node[];

  /**
   * Initializes the nodes with the visibility toggle.
   */
  ngOnInit(): void {
    this.nodes = dataTypesToNodes(this.dataTypes);
    this.nodesWithVisibilityToggle = this.nodes.map((node: Node) => {
      return {
        ...node,
        dataTypesAreVisible: false
      };
    });
  }

  /**
   * Toggles Visibility whenever a node is selected
   * @param node The node to toggle the visibility of the data types for.
   */
  toggleDataTypeVisibility = (node: NodeWithVisibilityToggle) => {
    node.dataTypesAreVisible = !node.dataTypesAreVisible;
  };

  /**
   * Toggles the sidebar.
   */
  toggleSidebar = () => {
    this.showSelection = !this.showSelection;
  };

  transformDataTypeName(dataTypeName: string) {
    return dataTypeNamePipe(dataTypeName);
  }
}
