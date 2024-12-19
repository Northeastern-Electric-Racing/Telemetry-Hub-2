import { Component, Input } from '@angular/core';

@Component({
  selector: 'vstack',
  templateUrl: './vstack.component.html',
  styleUrls: ['./vstack.component.css']
})
export default class VStackComponent {
  @Input() spacing: string = '5px';
  @Input() align: string = 'center';
}
