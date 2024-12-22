import { Component, HostListener, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { DataTypeEnum } from 'src/data-type.enum';

@Component({
  selector: 'date-location',
  templateUrl: './date-location.component.html',
  styleUrl: './date-location.component.css'
})
export class DateLocationComponent implements OnInit {
  private storage = inject(Storage);
  time = new Date();
  location: string = 'Boston, MA';
  mobileThreshold = 1070;
  isMobile = window.innerWidth < this.mobileThreshold;

  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.storage.get(DataTypeEnum.LOCATION).subscribe((value) => {
      [this.location] = value.values || ['No Location Set'];
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= this.mobileThreshold;
  }
}
