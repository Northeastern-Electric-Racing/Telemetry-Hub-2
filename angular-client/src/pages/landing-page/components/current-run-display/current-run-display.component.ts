import { Component, OnInit } from '@angular/core';
import Storage from 'src/services/storage.service';

@Component({
  selector: 'current-run-display',
  templateUrl: './current-run-display.component.html',
  styleUrl: './current-run-display.component.css'
})
export class CurrentRunDisplay implements OnInit {
  currentRun: number = 0;
  constructor(private storage: Storage) {}

  ngOnInit() {
    this.storage.getCurrentRunId().subscribe((runId) => {
      if (runId) {
        this.currentRun = runId;
      }
    });
  }
}
