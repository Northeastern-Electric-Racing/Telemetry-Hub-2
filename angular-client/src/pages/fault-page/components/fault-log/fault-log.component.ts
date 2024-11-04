import { Component, Input } from '@angular/core';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';
import { Fault } from '../../shared/fault.model';
import { CHARGER_FAULT_NAMES, ChargerFault } from '../../shared/indiv-fault/charger-fault.model';
import APIService from 'src/services/api.service';
import { BMSFault } from '../../shared/indiv-fault/bms-fault.model';

@Component({
  selector: 'fault-log',
  templateUrl: './fault-log.component.html',
  styleUrls: ['./fault-log.component.css']
})
export default class FaultLog {
  @Input() setSelectedFault!: (fault: Fault) => void;
  faults: Fault[] = [];
  faultsShifted: boolean = false;
  resetButton = {
    onClick: () => {
      this.faults = [];
    },
    icon: 'restart_alt'
  };
  constructor(
    private serverService: APIService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get(IdentifierDataType.COMM_TIMEOUT_FAULT).subscribe((value) => {
      this.faults.unshift(new ChargerFault(this.serverService, CHARGER_FAULT_NAMES.COMM_TIMEOUT_FAULT, value.time));
    });

    this.storage.get(IdentifierDataType.HARDWARE_FAILURE_FAULT).subscribe((value) => {
      this.faults.unshift(new ChargerFault(this.serverService, CHARGER_FAULT_NAMES.HARDWARE_FAILURE_FAULT, value.time));
    });

    this.storage.get(IdentifierDataType.OVER_TEMP_FAULT).subscribe((value) => {
      this.faults.unshift(new ChargerFault(this.serverService, CHARGER_FAULT_NAMES.OVER_TEMP_FAULT, value.time));
    });

    this.storage.get(IdentifierDataType.VOLTAGE_WRONG_FAULT).subscribe((value) => {
      this.faults.unshift(new ChargerFault(this.serverService, CHARGER_FAULT_NAMES.VOLTAGE_WRONG_FAULT, value.time));
    });

    this.storage.get(IdentifierDataType.WRONG_BAT_CONNECT_FAULT).subscribe((value) => {
      this.faults.unshift(new ChargerFault(this.serverService, CHARGER_FAULT_NAMES.WRONG_BAT_CONNECT_FAULT, value.time));
    });

    this.storage.get(IdentifierDataType.BMS_FAULTS).subscribe((value) => {
      const bmsFaultID = parseInt(value.values[0]);
      try {
        this.faults.unshift(new BMSFault(this.serverService, bmsFaultID, value.time));
      } catch (error) {
        // do nothing (the value input was not a valid BMS fault, most likely 0)
      }
    });
  }
}
