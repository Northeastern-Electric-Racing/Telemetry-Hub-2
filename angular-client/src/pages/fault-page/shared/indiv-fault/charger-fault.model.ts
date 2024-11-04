import { NodeWithData } from 'src/utils/types.utils';
import { AllFaultNames, Fault } from '../fault.model';
import APIService from 'src/services/api.service';
import { fetchNodeDataOverPeriod } from 'src/utils/nodes/fetch-node-data.utils';

export enum CHARGER_FAULT_NAMES {
  COMM_TIMEOUT_FAULT = 'Comm Timeout',
  HARDWARE_FAILURE_FAULT = 'Hardware Failure',
  OVER_TEMP_FAULT = 'Over Temp',
  VOLTAGE_WRONG_FAULT = 'Voltage Wrong',
  WRONG_BAT_CONNECT_FAULT = 'Wrong Battery Connect'
}

export class ChargerFault implements Fault {
  name: CHARGER_FAULT_NAMES;
  timeTriggered: number;
  relvantNodesWithData: NodeWithData[];

  /**
   * Constructs a new Charger fault base on a valid faultValue
   * @param faultValue
   * @param timeTriggered
   */
  constructor(
    private serverService: APIService,
    faultValue: CHARGER_FAULT_NAMES,
    timeTriggered: string
  ) {
    this.name = faultValue;
    this.timeTriggered = +timeTriggered;
    this.relvantNodesWithData = this.updateRelvantNodes(this.timeTriggered);
  }

  format(): { type: string; name: string; time: string } {
    return { type: 'Charger', name: this.name.toString(), time: new Date(this.timeTriggered).toLocaleTimeString() };
  }
  updateRelvantNodes(timeTriggered: number): NodeWithData[] {
    return [fetchNodeDataOverPeriod('Charger', timeTriggered, this.serverService)];
  }
}
