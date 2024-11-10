import { NodeWithData } from 'src/utils/types.utils';
import { Fault } from '../fault.model';
import { fetchNodeDataOverPeriod } from 'src/utils/nodes/fetch-node-data.utils';
import APIService from 'src/services/api.service';
import { get } from 'http';

export enum DTI_FAULTS_VALUES {
  OVER_VOLTAGE = 1,
  UNDER_VOLTAGE = 2,
  DRV = 3,
  ABS_OVER_CURRENT = 4,
  CTLR_OVER_TEMP = 5,
  MOTOR_OVER_TEMP = 6,
  SENSOR_WIRE_FAULT = 7,
  SENSOR_GENERAL_FAULT = 8,
  CAN_COMMAND_ERROR = 9,
  ANALOG_INPUT_ERROR = 10
}

export enum DTI_FAULTS_NAMES {
  OVER_VOLTAGE = 'Over Voltage',
  UNDER_VOLTAGE = 'Under Voltage',
  DRV = 'DRV',
  ABS_OVER_CURRENT = 'ABS Over Current',
  CTLR_OVER_TEMP = 'Controller Over Temp',
  MOTOR_OVER_TEMP = 'Motor Over Temp',
  SENSOR_WIRE_FAULT = 'Sensor Wire Fault',
  SENSOR_GENERAL_FAULT = 'Sensor General Fault',
  CAN_COMMAND_ERROR = 'CAN Command Error',
  ANALOG_INPUT_ERROR = 'Analog Input Error'
}

export class DTIFault implements Fault {
  name: DTI_FAULTS_NAMES;
  timeTriggered: number;
  relvantNodesWithData: NodeWithData[];

  /**
   * Constructs a new DTI fault base on a valid faultValue
   * @param faultValue
   * @param timeTriggered
   */
  constructor(
    private serverService: APIService,
    faultValue: number,
    timeTriggered: number
  ) {
    this.name = this.getDTIFaultName(faultValue);
    this.timeTriggered = timeTriggered;
    this.relvantNodesWithData = this.updateRelvantNodes(this.timeTriggered);
  }

  format(): { type: string; name: string; time: string } {
    return { type: 'DTI', name: this.name.toString(), time: new Date(this.timeTriggered).toLocaleTimeString() };
  }

  updateRelvantNodes(timeTriggered: number): NodeWithData[] {
    return [fetchNodeDataOverPeriod('DTI', timeTriggered, this.serverService)];
  }

  getDTIFaultName(faultValue: DTI_FAULTS_VALUES): DTI_FAULTS_NAMES {
    switch (faultValue) {
      case DTI_FAULTS_VALUES.OVER_VOLTAGE:
        return DTI_FAULTS_NAMES.OVER_VOLTAGE;
      case DTI_FAULTS_VALUES.UNDER_VOLTAGE:
        return DTI_FAULTS_NAMES.UNDER_VOLTAGE;
      case DTI_FAULTS_VALUES.DRV:
        return DTI_FAULTS_NAMES.DRV;
      case DTI_FAULTS_VALUES.ABS_OVER_CURRENT:
        return DTI_FAULTS_NAMES.ABS_OVER_CURRENT;
      case DTI_FAULTS_VALUES.CTLR_OVER_TEMP:
        return DTI_FAULTS_NAMES.CTLR_OVER_TEMP;
      case DTI_FAULTS_VALUES.MOTOR_OVER_TEMP:
        return DTI_FAULTS_NAMES.MOTOR_OVER_TEMP;
      case DTI_FAULTS_VALUES.SENSOR_WIRE_FAULT:
        return DTI_FAULTS_NAMES.SENSOR_WIRE_FAULT;
      case DTI_FAULTS_VALUES.SENSOR_GENERAL_FAULT:
        return DTI_FAULTS_NAMES.SENSOR_GENERAL_FAULT;
      case DTI_FAULTS_VALUES.CAN_COMMAND_ERROR:
        return DTI_FAULTS_NAMES.CAN_COMMAND_ERROR;
      case DTI_FAULTS_VALUES.ANALOG_INPUT_ERROR:
        return DTI_FAULTS_NAMES.ANALOG_INPUT_ERROR;
      default:
        throw new Error('Invalid DTI fault value');
    }
  }
}
