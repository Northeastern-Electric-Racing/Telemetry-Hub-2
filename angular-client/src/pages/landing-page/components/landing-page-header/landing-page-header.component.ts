import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { startNewRun } from 'src/api/run.api';
import APIService from 'src/services/api.service';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';

/**
 * Container for the landing page, obtains data from the storage service.
 */
@Component({
  selector: 'landing-page-header',
  styleUrls: ['./landing-page-header.component.css'],
  templateUrl: './landing-page-header.component.html'
})
export default class LandingPageHeader implements OnInit {
  time = new Date();
  location: string = 'No Location Set';
  newRunIsLoading = false;
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

  onStartNewRun!: () => void;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= this.mobileThreshold;
  }
}
