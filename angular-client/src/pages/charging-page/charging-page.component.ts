import { Component, HostListener, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';

/**
 * Container for the Charging page, obtains data from the storage service.
 */
@Component({
  selector: 'charging-page',
  styleUrls: ['./charging-page.component.css'],
  templateUrl: './charging-page.component.html'
})
export default class ChargingPageComponent implements OnInit {
  private storage = inject(Storage);
  time = new Date();
  location: string = 'No Location Set';
  mobileThreshold = 1070;
  isMobile = window.innerWidth < this.mobileThreshold;

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
