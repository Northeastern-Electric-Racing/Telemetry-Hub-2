import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, OnDestroy, inject, HostListener } from '@angular/core';
import { DataType, Node, NodeWithVisibilityToggle, NodeWithVisibilityToggleObservable } from 'src/utils/types.utils';
import Storage from 'src/services/storage.service';
import { decimalPipe } from 'src/utils/pipes.utils';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Observable, of, Subscription } from 'rxjs';
import { dataTypesToNodes } from 'src/utils/dataTypes.utils';
import { dataTypeNamePipe } from 'src/utils/dataTypes.utils';

/**
 * Sidebar component that displays the nodes and their data types.
 * @param nodes The nodes to display.
 * Has animations for when a node is selected to collapse and expand the associated datatypes
 *
 */
@Component({
  selector: 'graph-sidebar-desktop',
  templateUrl: './graph-sidebar-desktop.component.html',
  styleUrls: ['./graph-sidebar-desktop.component.css'],
  animations: [
    trigger('toggleExpand', [
      transition(':enter', [
        style({
          height: 0,
          opacity: 0,
          transform: 'translateY(-25%)'
        }),
        animate(
          '400ms',
          style({
            height: '*',
            opacity: 1,
            transform: 'translateY(0)'
          })
        )
      ]),
      transition(':leave', [
        animate(
          '400ms',
          style({
            height: 0,
            opacity: 0,
            transform: 'translateY(-25%)'
          })
        )
      ])
    ])
  ]
})
export default class GraphSidebarDesktopComponent implements OnInit, OnDestroy {
  private storage = inject(Storage);
  @Input() dataTypes!: DataType[];
  @Input() selectDataType!: (dataType: DataType) => void;
  selectedDataType!: DataType;
  nodesWithVisibilityToggle!: Observable<NodeWithVisibilityToggleObservable[]>;
  nodes!: Node[];

  filterForm: FormGroup = new FormGroup({
    searchFilter: new FormControl<string>('')
  });
  filterFormSubsription!: Subscription;
  searchFilter: string = '';

  dataValuesMap: Map<string, string> = new Map();

  /**
   * Initializes the nodes with the visibility toggle.
   */
  ngOnInit(): void {
    this.nodes = dataTypesToNodes(this.dataTypes);
    this.nodesWithVisibilityToggle = of(
      this.nodes.map((node: Node) => {
        return {
          ...node,
          dataTypesObservable: of(node.dataTypes),
          dataTypesAreVisible: false
        };
      })
    );
    console.log(this.nodesWithVisibilityToggle);

    // Callback to update search regex (debounced at 300 ms)
    this.filterFormSubsription = this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe((changes) => {
      this.searchFilter = changes.searchFilter;
    });

    // Track values for all datatypes
    for (const node of this.nodes) {
      for (const dataType of node.dataTypes) {
        this.dataValuesMap.set(dataType.name, '');
        this.storage.get(dataType.name).subscribe((value) => {
          if (value) {
            const displayValue = decimalPipe(value.values[0], 3).toString() + ' ' + value.unit;
            this.dataValuesMap.set(dataType.name, displayValue);
          }
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.filterFormSubsription.unsubscribe();
  }

  clickDataType(dataType: DataType) {
    this.selectDataType(dataType);
    this.selectedDataType = dataType;
  }

  /**
   * Toggles Visibility whenever a node is selected
   * @param node The node to toggle the visibility of the data types for.
   */
  toggleDataTypeVisibility(node: NodeWithVisibilityToggle) {
    node.dataTypesAreVisible = !node.dataTypesAreVisible;
  }

  transformDataTypeName(dataTypeName: string) {
    return dataTypeNamePipe(dataTypeName);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(this.selectedDataType);
    if (this.selectedDataType) {
      const node = this.getNode(this.selectedDataType.name as string);
      const nodeIndex = this.getNodeIndex(this.getNode(this.selectedDataType.name as string));
      const dataTypeIndex = this.getDataTypeIndex(
        this.getNode(this.selectedDataType.name as string),
        this.getDataType(this.getNode(this.selectedDataType.name as string), this.selectedDataType.name as string)
      );
      console.log(this.selectedDataType.name, event, node, nodeIndex, dataTypeIndex);
      if (event.key === 'ArrowDown') {
        if (dataTypeIndex + 1 === node.dataTypes.length && nodeIndex + 1 === this.nodes?.length) {
          this.clickDataType(this.nodes?.at(0)?.dataTypes[0] as DataType);
        } else if (dataTypeIndex + 1 === node.dataTypes.length) {
          this.clickDataType(this.nodes?.at(nodeIndex + 1)?.dataTypes[0] as DataType);
        } else {
          console.log(node.dataTypes[dataTypeIndex + 1]);
          this.clickDataType(node.dataTypes[dataTypeIndex + 1]);
        }
      } else if (event.key === 'ArrowUp') {
        if (dataTypeIndex === 0 && nodeIndex === 0) {
          const lastNode = this.nodes?.at(this.nodes.length - 1) as Node;
          this.clickDataType(lastNode.dataTypes[(lastNode.dataTypes.length as number) - 1] as DataType);
        } else if (dataTypeIndex === 0) {
          const lastNode = this.nodes?.at(nodeIndex - 1) as Node;
          this.clickDataType(lastNode.dataTypes[(lastNode.dataTypes.length as number) - 1] as DataType);
        } else {
          this.clickDataType(node.dataTypes[dataTypeIndex - 1]);
        }
      }
    }
  }
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   if (this.dataTypeName === undefined) {
  //     this.setSelectedDataType(this.nodes?.at(0)?.dataTypes[0] as DataType);
  //   } else {
  //     const node = this.getNode(this.dataTypeName as string);
  //     const nodeIndex = this.getNodeIndex(this.getNode(this.dataTypeName as string));
  //     const dataTypeIndex = this.getDataTypeIndex(
  //       this.getNode(this.dataTypeName as string),
  //       this.getDataType(this.getNode(this.dataTypeName as string), this.dataTypeName as string)
  //     );
  //     if (event.key === 'ArrowDown') {
  //       if (dataTypeIndex + 1 === node.dataTypes.length && nodeIndex + 1 === this.nodes?.length) {
  //         this.setSelectedDataType(this.nodes?.at(0)?.dataTypes[0] as DataType);
  //       } else if (dataTypeIndex + 1 === node.dataTypes.length) {
  //         this.setSelectedDataType(this.nodes?.at(nodeIndex + 1)?.dataTypes[0] as DataType);
  //       } else {
  //         this.setSelectedDataType(node.dataTypes[dataTypeIndex + 1]);
  //       }
  //     } else if (event.key === 'ArrowUp') {
  //       if (dataTypeIndex === 0 && nodeIndex === 0) {
  //         const lastNode = this.nodes?.at(this.nodes.length - 1) as Node;
  //         this.setSelectedDataType(lastNode.dataTypes[(lastNode.dataTypes.length as number) - 1] as DataType);
  //       } else if (dataTypeIndex === 0) {
  //         const lastNode = this.nodes?.at(nodeIndex - 1) as Node;
  //         this.setSelectedDataType(lastNode.dataTypes[(lastNode.dataTypes.length as number) - 1] as DataType);
  //       } else {
  //         this.setSelectedDataType(node.dataTypes[dataTypeIndex - 1]);
  //       }
  //     }
  //   }
  // }

  private getNode(name: string): Node {
    return this.nodes?.filter(
      (node: Node) => node.dataTypes.filter((dataType: DataType) => dataType.name === name)[0]
    )[0] as Node;
  }

  private getNodeIndex(node: Node): number {
    return this.nodes?.indexOf(node) as number;
  }

  private getDataType(node: Node, name: string) {
    return node.dataTypes.filter((dataType: DataType) => dataType.name === name)[0];
  }

  private getDataTypeIndex(node: Node, dataType: DataType) {
    return node.dataTypes.indexOf(dataType);
  }
}
