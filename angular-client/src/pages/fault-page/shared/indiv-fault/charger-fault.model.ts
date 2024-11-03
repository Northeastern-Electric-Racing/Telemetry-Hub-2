import { NodeWithData } from 'src/utils/types.utils';
import { AllFaultEnums, Fault } from '../fault.model';
import APIService from 'src/services/api.service';
import { fetchNodeDataOverPeriod } from 'src/utils/nodes/fetch-node-data.utils';

export enum CHARGER_FAULT_VALUES {
  COMM_TIMEOUT_FAULT = 'Comm Timeout',
  HARDWARE_FAILURE_FAULT = 'Hardware Failure',
  OVER_TEMP_FAULT = 'Over Temp',
  VOLTAGE_WRONG_FAULT = 'Voltage Wrong',
  WRONG_BAT_CONNECT_FAULT = 'Wrong Battery Connect'
}

export class ChargerFault implements Fault {
  name: AllFaultEnums;
  timeTriggered: Date;
  relvantNodesWithData: NodeWithData[];

  /**
   * Constructs a new Charger fault base on a valid faultValue
   * @param faultValue
   * @param timeTriggered
   */
  constructor(
    private serverService: APIService,
    faultValue: CHARGER_FAULT_VALUES,
    timeTriggered: Date
  ) {
    this.name = faultValue;
    this.timeTriggered = timeTriggered;
    this.relvantNodesWithData = this.updateRelvantNodes(this.timeTriggered);
  }

  format(): { type: String; name: String; timeTriggered: number } {
    return { type: 'Charger', name: this.name.toString(), timeTriggered: this.timeTriggered.getTime() };
  }
  updateRelvantNodes(timeTriggered: Date): NodeWithData[] {
    return fetchNodeDataOverPeriod(
      ['Charger'],
      timeTriggered.getTime(),
      timeTriggered.getTime() - 30 * 1000,
      this.serverService
    );
  }
}
