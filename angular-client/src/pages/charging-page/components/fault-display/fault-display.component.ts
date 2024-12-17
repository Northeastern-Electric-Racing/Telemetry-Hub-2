import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs';
import Storage from 'src/services/storage.service';
import { IdentifierDataType } from 'src/utils/enumerations/identifier-data-type';

enum FaultType {
  BMS = 'BMS',
  Charger = 'Charger'
}

@Component({
  selector: 'fault-display',
  templateUrl: './fault-display.component.html',
  styleUrls: ['./fault-display.component.css']
})
export default class FaultDisplay implements OnInit {
  faults: { type: string; name: string; time: string }[] = [];
  faultsShifted: boolean = false;
  resetButton = {
    onClick: () => {
      this.faults = [];
    },
    icon: 'restart_alt'
  };

  constructor(private storage: Storage) {}

  ngOnInit() {
    const chargerFaultAndDisplayNames = [
      {
        displayName: 'Comm Timeout',
        faultIdentifier: IdentifierDataType.COMM_TIMEOUT_FAULT
      },
      {
        displayName: 'Hardware Failure',
        faultIdentifier: IdentifierDataType.HARDWARE_FAILURE_FAULT
      },
      {
        displayName: 'Over Temp',
        faultIdentifier: IdentifierDataType.OVER_TEMP_FAULT
      },
      {
        displayName: 'Over Voltage Fault',
        faultIdentifier: IdentifierDataType.OVER_VOLTAGE_FAULT
      },
      {
        displayName: 'Wrong Battery Connect',
        faultIdentifier: IdentifierDataType.WRONG_BAT_CONNECT_FAULT
      }
    ];
    // Subscribe to each charger fault, with a display name (to display when the fault is triggered)
    chargerFaultAndDisplayNames.forEach((faultAndDisplayName) => {
      this.faultSubcribe(faultAndDisplayName.displayName, faultAndDisplayName.faultIdentifier, FaultType.Charger);
    });

    const bmsFaultAndDisplayNames = [
      {
        displayName: 'Open Wire',
        faultIdentifier: IdentifierDataType.OPEN_WIRE
      },
      {
        displayName: 'Charger Limit Enforcement',
        faultIdentifier: IdentifierDataType.CHARGER_LIMIT_ENFORCEMENT_FAULT
      },
      {
        displayName: 'Charger Can Fault',
        faultIdentifier: IdentifierDataType.CHARGER_CAN_FAULT
      },
      {
        displayName: 'Battery Thermistor',
        faultIdentifier: IdentifierDataType.BATTERY_THERMISTOR
      },
      {
        displayName: 'Charger Safety Relay',
        faultIdentifier: IdentifierDataType.CHARGER_SAFETY_RELAY
      },
      {
        displayName: 'Discharge Limit Enforcement',
        faultIdentifier: IdentifierDataType.DISCHARGE_LIMIT_ENFORCEMENT_FAULT
      },
      {
        displayName: 'External Can Fault',
        faultIdentifier: IdentifierDataType.EXTERNAL_CAN_FAULT
      },
      {
        displayName: 'Weak Pack Fault',
        faultIdentifier: IdentifierDataType.WEAK_PACK_FAULT
      },
      {
        displayName: 'Low Cell Voltage',
        faultIdentifier: IdentifierDataType.LOW_CELL_VOLTAGE
      },
      {
        displayName: 'Charge Reading Mismatch',
        faultIdentifier: IdentifierDataType.CHARGE_READING_MISMATCH
      },
      {
        displayName: 'Current Sensor Fault',
        faultIdentifier: IdentifierDataType.CURRENT_SENSOR_FAULT
      },
      {
        displayName: 'Internal Cell Comm Fault',
        faultIdentifier: IdentifierDataType.INTERNAL_CELL_COMM_FAULT
      },
      {
        displayName: 'Internal Software Fault',
        faultIdentifier: IdentifierDataType.INTERNAL_SOFTWARE_FAULT
      },
      {
        displayName: 'Pack Overheat',
        faultIdentifier: IdentifierDataType.PACK_OVERHEAT
      },
      {
        displayName: 'Cell Undervoltage',
        faultIdentifier: IdentifierDataType.CELL_UNDERVOLTAGE
      },
      {
        displayName: 'Cell Overvoltage',
        faultIdentifier: IdentifierDataType.CELL_OVERVOLTAGE
      },
      {
        displayName: 'Cells Not Balancing',
        faultIdentifier: IdentifierDataType.CELLS_NOT_BALANCING
      }
    ];

    // Subscribe to each BMS fault, with a display name (to display when the fault is triggered)
    bmsFaultAndDisplayNames.forEach((faultAndDisplayName) => {
      this.faultSubcribe(faultAndDisplayName.displayName, faultAndDisplayName.faultIdentifier, FaultType.BMS);
    });
  }

  /**
   * Subscribes to the the {@link faultIdentifier} as key in {@link storage} given and
   * checks each message to see if it is a fault using {@link addFault}.
   *
   * @param displayName the name of the fault to be displayed.
   * @param faultIdentifier the identifier for the fault.
   * @param faultType the type of the fault.
   */
  private faultSubcribe(displayName: string, faultIdentifier: IdentifierDataType, faultType: FaultType) {
    let lastFaultValue = 0;
    this.storage.get(faultIdentifier).subscribe((value) => {
      const newValue = parseInt(value.values[0]);
      this.addFault(newValue, displayName, faultType, lastFaultValue);
      lastFaultValue = newValue;
    });
  }

  /**
   * Adds the fault name, with the current time to the faults array, if the faultValue is NOT 0 and
   * the last message was a positive for the fault (lastFaultValue is 0).
   * Shifts through the fault array to keep only the most recent 50 faults.
   *
   * @param faultValue an string with an integer value.
   * @param faultName the name of the fault, to be displayed.
   */
  private addFault(faultValue: number, faultName: string, faultType: FaultType, lastFaultValue: number) {
    // only add fault if it is positve for a fault and the last value for this fault was not a fault
    if (faultValue !== 0 && lastFaultValue === 0) {
      if (this.faults.length >= 50) {
        this.faults.pop();
      }
      this.faultsShifted = !this.faultsShifted;

      this.faults.unshift({
        type: faultType,
        name: faultName,
        time: new Date().toLocaleTimeString()
      });
    }
  }
}
