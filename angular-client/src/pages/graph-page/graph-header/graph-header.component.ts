import { Component, Input, OnInit } from '@angular/core';

/**
 * Graph Header Component to display the graph page header.
 * Utilizes the header component to display the header.
 */
@Component({
  selector: 'graph-header',
  templateUrl: './graph-header.component.html',
  styleUrls: ['./graph-header.component.css']
})
export default class GraphHeaderComponent implements OnInit {
  @Input() runId?: number;

  time = new Date();

  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
}
