import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Run } from '@prisma/client';
import { getAllRuns } from 'src/api/run.api';
import APIService from 'src/services/api.service';

// ok the history component should query all the runs and display
// each run as a card with the required info

// the data for the dialog, basically just all the runs
export interface DialogData {
  runs: Run[];
}

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryButton {
  runs: Run[];
  serverService = new APIService();

  constructor(public dialog: MatDialog) {
    // currently using sample run data, actual would use api call something like below
    // this.runs = this.serverService.query<Run[]>(getAllRuns).data.subscribe.arguments;
    this.runs = [
      { id: 1, locationName: 'Boston', driverId: 'Bruh', systemId: 'Yuh', time: new Date() },
      { id: 2, locationName: 'China', driverId: 'Bruh', systemId: 'Yuh', time: new Date() },
      { id: 3, locationName: 'China', driverId: 'Bruh', systemId: 'Yuh', time: new Date() }
    ];
  }

  openDialog(): void {
    this.dialog.open(CarouselRun, {
      width: '550px',
      height: '200px',
      data: { runs: this.runs }
    });
  }
}

@Component({
  selector: 'carousel',
  templateUrl: 'carousel.component.html',
  styleUrls: ['history.component.css']
})
export class CarouselRun implements OnInit {
  runs: Run[];

  responsiveOptions: any[] | undefined;

  constructor(
    public dialogRef: MatDialogRef<CarouselRun>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.runs = data.runs;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}