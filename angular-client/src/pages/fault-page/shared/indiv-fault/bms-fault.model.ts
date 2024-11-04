import { NodeWithData } from 'src/utils/types.utils';
import { Fault } from '../fault.model';
import APIService from 'src/services/api.service';
import { fetchNodeDataOverPeriod } from 'src/utils/nodes/fetch-node-data.utils';

export enum BMS_FAULTS_VALUES {
  CELLS_NOT_BALANCING = 1,
  CELL_VOLTAGE_TOO_LOW = 2,
  CELL_VOLTAGE_TOO_HIGH = 4,
  PACK_TOO_HOT = 8,
  OPEN_WIRING_FAULT = 16,
  INTERNAL_SOFTWARE_FAULT = 32,
  INTERNAL_THERMAL_ERROR = 64,
  INTERNAL_CELL_COMM_FAULT = 128,
  CURRENT_SENSOR_FAULT = 256,
  CHARGE_READING_MISMATCH = 512,
  LOW_CELL_VOLTAGE = 1024,
  WEAK_PACK_FAULT = 2048,
  EXTERNAL_CAN_FAULT = 4096,
  DISCHARGE_LIMIT_ENFORCEMENT_FAULT = 8192,
  CHARGER_SAFETY_RELAY = 16384,
  BATTERY_THERMISTOR = 32768,
  CHARGER_CAN_FAULT = 65536,
  CHARGER_LIMIT_ENFORCEMENT_FAULT = 131072
}

export enum BMS_FAULT_NAMES {
  CELLS_NOT_BALANCING = 'Cells Not Balancing',
  CELL_VOLTAGE_TOO_LOW = 'Cell Voltage Too Low',
  CELL_VOLTAGE_TOO_HIGH = 'Cell Voltage Too High',
  PACK_TOO_HOT = 'Pack Too Hot',
  OPEN_WIRING_FAULT = 'Open Wiring Fault',
  INTERNAL_SOFTWARE_FAULT = 'Internal Software Fault',
  INTERNAL_THERMAL_ERROR = 'Internal Thermal Error',
  INTERNAL_CELL_COMM_FAULT = 'Internal Cell Comm Fault',
  CURRENT_SENSOR_FAULT = 'Current Sensor Fault',
  CHARGE_READING_MISMATCH = 'Charge Reading Mismatch',
  LOW_CELL_VOLTAGE = 'Low Cell Voltage',
  WEAK_PACK_FAULT = 'Weak Pack Fault',
  EXTERNAL_CAN_FAULT = 'External Can Fault',
  DISCHARGE_LIMIT_ENFORCEMENT_FAULT = 'Discharge Limit Enforcement Fault',
  CHARGER_SAFETY_RELAY = 'Charger Safety Relay',
  BATTERY_THERMISTOR = 'Battery Thermistor',
  CHARGER_CAN_FAULT = 'Charger Can Fault',
  CHARGER_LIMIT_ENFORCEMENT_FAULT = 'Charger Limit Enforcement Fault'
}

export class BMSFault implements Fault {
  name: BMS_FAULT_NAMES;
  timeTriggered: number;
  relvantNodesWithData: NodeWithData[];
  faultSpecificNode!: NodeWithData;

  /**
   * Constructs a new BMS fault base on a valid faultValue
   * @param faultValue
   * @param timeTriggered
   */
  constructor(
    private serverService: APIService,
    faultValue: number,
    timeTriggered: string
  ) {
    if (faultValue in BMS_FAULTS_VALUES) {
      this.name = this.getBMSFaultName(faultValue);
      this.timeTriggered = +timeTriggered;
      this.relvantNodesWithData = this.updateRelvantNodes(this.timeTriggered);
    } else {
      throw new Error('Invalid BMS fault value');
    }
  }
  updateRelvantNodes(timeTriggered: number): NodeWithData[] {
    return [fetchNodeDataOverPeriod('BMS', timeTriggered, this.serverService)];
  }

  format(): { type: string; name: string; time: string } {
    return { type: 'BMS', name: this.name.toString(), time: new Date(this.timeTriggered).toLocaleTimeString() };
  }

  getBMSFaultName(faultValue: BMS_FAULTS_VALUES): BMS_FAULT_NAMES {
    switch (faultValue) {
      case BMS_FAULTS_VALUES.CELLS_NOT_BALANCING:
        return BMS_FAULT_NAMES.CELLS_NOT_BALANCING;
      case BMS_FAULTS_VALUES.CELL_VOLTAGE_TOO_LOW:
        return BMS_FAULT_NAMES.CELL_VOLTAGE_TOO_LOW;
      case BMS_FAULTS_VALUES.CELL_VOLTAGE_TOO_HIGH:
        return BMS_FAULT_NAMES.CELL_VOLTAGE_TOO_HIGH;
      case BMS_FAULTS_VALUES.PACK_TOO_HOT:
        return BMS_FAULT_NAMES.PACK_TOO_HOT;
      case BMS_FAULTS_VALUES.OPEN_WIRING_FAULT:
        return BMS_FAULT_NAMES.OPEN_WIRING_FAULT;
      case BMS_FAULTS_VALUES.INTERNAL_SOFTWARE_FAULT:
        return BMS_FAULT_NAMES.INTERNAL_SOFTWARE_FAULT;
      case BMS_FAULTS_VALUES.INTERNAL_THERMAL_ERROR:
        return BMS_FAULT_NAMES.INTERNAL_THERMAL_ERROR;
      case BMS_FAULTS_VALUES.INTERNAL_CELL_COMM_FAULT:
        return BMS_FAULT_NAMES.INTERNAL_CELL_COMM_FAULT;
      case BMS_FAULTS_VALUES.CURRENT_SENSOR_FAULT:
        return BMS_FAULT_NAMES.CURRENT_SENSOR_FAULT;
      case BMS_FAULTS_VALUES.CHARGE_READING_MISMATCH:
        return BMS_FAULT_NAMES.CHARGE_READING_MISMATCH;
      case BMS_FAULTS_VALUES.LOW_CELL_VOLTAGE:
        return BMS_FAULT_NAMES.LOW_CELL_VOLTAGE;
      case BMS_FAULTS_VALUES.WEAK_PACK_FAULT:
        return BMS_FAULT_NAMES.WEAK_PACK_FAULT;
      case BMS_FAULTS_VALUES.EXTERNAL_CAN_FAULT:
        return BMS_FAULT_NAMES.EXTERNAL_CAN_FAULT;
      case BMS_FAULTS_VALUES.DISCHARGE_LIMIT_ENFORCEMENT_FAULT:
        return BMS_FAULT_NAMES.DISCHARGE_LIMIT_ENFORCEMENT_FAULT;
      case BMS_FAULTS_VALUES.CHARGER_SAFETY_RELAY:
        return BMS_FAULT_NAMES.CHARGER_SAFETY_RELAY;
      case BMS_FAULTS_VALUES.BATTERY_THERMISTOR:
        return BMS_FAULT_NAMES.BATTERY_THERMISTOR;
      case BMS_FAULTS_VALUES.CHARGER_CAN_FAULT:
        return BMS_FAULT_NAMES.CHARGER_CAN_FAULT;
      case BMS_FAULTS_VALUES.CHARGER_LIMIT_ENFORCEMENT_FAULT:
        return BMS_FAULT_NAMES.CHARGER_LIMIT_ENFORCEMENT_FAULT;
      default:
        throw new Error('Invalid BMS fault value');
    }
  }
}
