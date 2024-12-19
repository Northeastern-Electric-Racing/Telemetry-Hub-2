import { Component, inject } from '@angular/core';
import SidebarService from 'src/services/sidebar.service';

@Component({
  selector: 'sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.css']
})
export default class SidebarToggleComponent {
  private sidebarService = inject(SidebarService);

  toggleSidebar() {
    this.sidebarService.openSidebar();
  }
}
