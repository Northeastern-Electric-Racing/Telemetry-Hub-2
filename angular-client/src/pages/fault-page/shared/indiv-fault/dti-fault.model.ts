import { NodeWithData } from 'src/utils/types.utils';
import { Fault } from '../fault.model';
import { fetchNodeDataOverPeriod } from 'src/utils/nodes/fetch-node-data.utils';
import APIService from 'src/services/api.service';

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

export class DTIFault implements Fault {
  name: DTI_FAULTS_VALUES;
  timeTriggered: Date;
  relvantNodesWithData: NodeWithData[];

  /**
   * Constructs a new DTI fault base on a valid faultValue
   * @param faultValue
   * @param timeTriggered
   */
  constructor(
    private serverService: APIService,
    faultValue: DTI_FAULTS_VALUES,
    timeTriggered: Date
  ) {
    this.name = faultValue;
    this.timeTriggered = timeTriggered;
    this.relvantNodesWithData = this.updateRelvantNodes(this.timeTriggered);
  }

  format(): { type: String; name: String; timeTriggered: number } {
    return { type: 'DTI', name: this.name.toString(), timeTriggered: this.timeTriggered.getTime() };
  }
  updateRelvantNodes(timeTriggered: Date): NodeWithData[] {
    return fetchNodeDataOverPeriod(
      ['DTI'],
      timeTriggered.getTime(),
      timeTriggered.getTime() - 30 * 1000,
      this.serverService
    );
  }
}
