import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataType } from 'src/utils/types.utils';

/**
 * Sidebar Card Component to display a card in the sidebar.
 * @param title The title of the card.
 * @param subtitle The subtitle of the card.
 */
@Component({
  selector: 'sidebar-card',
  templateUrl: './sidebar-card.component.html',
  styleUrls: ['./sidebar-card.component.css']
})
export default class SidebarCard implements OnInit {
  @Input() title!: string;
  @Input() dropDown?: boolean;
  @Input() open?: boolean;
  @Input() dataValue?: string;
  @Input() selected?: boolean;
  iconId!: string;

  ngOnInit(): void {
    this.iconId = `${this.title}-icon`;
  }
}
