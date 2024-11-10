import { Component, HostListener } from '@angular/core';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';

@Component({
  selector: 'date-location',
  templateUrl: './date-location.component.html',
  styleUrl: './date-location.component.css'
})
export class DateLocation {
  time = new Date();
  location: string = 'Boston, MA';
  mobileThreshold = 1070;
  isMobile = window.innerWidth < this.mobileThreshold;

  constructor(private storage: Storage) {}

  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.storage.get(IdentifierDataType.LOCATION).subscribe((value) => {
      [this.location] = value.values || ['No Location Set'];
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= this.mobileThreshold;
  }
}
