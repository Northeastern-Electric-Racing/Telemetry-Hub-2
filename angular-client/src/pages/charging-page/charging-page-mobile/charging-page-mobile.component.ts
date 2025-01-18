import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import Storage from 'src/services/storage.service';
import { DataTypeEnum } from 'src/data-type.enum';

@Component({
  selector: 'charging-page-mobile',
  templateUrl: './charging-page-mobile.component.html',
  styleUrls: ['./charging-page-mobile.component.css']
})
export default class ChargingPageMobileComponent implements OnInit {
  private storage = inject(Storage);
  @Input() time = new Date();
  location: string = 'No Location Set';
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
