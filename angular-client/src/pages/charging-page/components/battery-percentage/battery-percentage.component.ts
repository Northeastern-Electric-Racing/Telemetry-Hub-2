import { Component, Input, OnInit } from '@angular/core';
import Theme from 'src/services/theme.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'battery-percentage',
  templateUrl: 'battery-percentage.component.html',
  styleUrls: ['battery-percentage.component.css'],
  // TODO: this is just a dumb animation that changes the color of the nub, would like to make something actually
  // cool or interesting in the future
  animations: [
    // metadata array
    trigger('toggleClick', [
      // trigger block
      state(
        'true',
        style({
          // final CSS following animation
          backgroundColor: 'grey'
        })
      ),
      state(
        'false',
        style({
          backgroundColor: Theme.batteryBack
        })
      ),
      transition('true => false', animate('1000ms linear')), // animation timing
      transition('false => true', animate('1000ms linear'))
    ])
  ]
})
export class BatteryPercentageComponent implements OnInit {
  @Input() percentage!: number;
  @Input() height!: number;
  @Input() width!: number;

  // Background Styles
  heightpx!: string;
  widthpx!: string;
  backgroundColor: string = Theme.batteryBack;

  // Fill Styles
  fillWidth!: string;
  fillMarginBottom!: string;

  // Nub Styles
  clicked: boolean = false;
  nubHeight!: string;
  nubWidth!: string;

  // Corner Styles
  roundCorner!: string;

  // setting color and rendering
  ngOnInit() {
    this.renderBattery();
  }

  // fills battery bar based on current percentage
  renderBattery() {
    const minDim = Math.min(this.width, this.height);
    this.heightpx = this.height + 'px';
    this.widthpx = this.width + 'px';

    this.fillWidth = this.width * 0.9 + 'px';
    this.fillMarginBottom = this.height * 0.05 + 'px';

    this.nubHeight = this.height / 10 + 'px';
    this.nubWidth = this.width / 2 + 'px';

    this.roundCorner = minDim * 0.05 + 'px';
  }

  getFillHeight = (percentage: number) => {
    return (percentage / 100) * (this.height * 0.9) + 'px';
  };

  getFillColor = (percentage: number) => {
    if (percentage <= 20) {
      return Theme.battteryLow;
    }
    return Theme.battteryHigh;
  };

  toggleIsCorrect() {
    this.clicked = !this.clicked; // change in data-bound value
  }
}
