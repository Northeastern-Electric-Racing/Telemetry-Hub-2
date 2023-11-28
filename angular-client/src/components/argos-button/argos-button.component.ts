import { Component, Input } from '@angular/core';

/**
 * Simple custom button component that does something on click
 * Takes label and onClick function as inputs
 * Currently has one set button style but can be expanded to have more customizable styles
 */
@Component({
  selector: 'argos-button',
  templateUrl: './argos-button.component.html',
  styleUrls: ['./argos-button.component.css']
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() onClick!: () => void;
}
