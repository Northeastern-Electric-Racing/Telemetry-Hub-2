import { Component, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';

@Component({
  selector: 'connection-display',
  templateUrl: './connection-display.component.html',
  styleUrl: './connection-display.component.css'
})
export default class ConnectionDisplayComponent implements OnInit {
  private storage = inject(Storage);
  connected: boolean = false;

  ngOnInit() {
    this.storage.getCurrentRunId().subscribe((runId) => {
      this.connected = runId !== undefined;
    });
  }

  getConnectedStatus(connected: boolean) {
    return connected ? 'Connected' : 'Disconnected';
  }

  getConnectedColor(connected: boolean) {
    return connected ? 'green' : 'red';
  }
}
