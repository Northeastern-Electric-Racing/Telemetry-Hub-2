import { NodeWithData } from 'src/utils/types.utils';
import { AllFaultEnums, Fault } from '../fault.model';
import { fetchNodeDataOverPeriod } from 'src/utils/nodes/fetch-node-data.utils';
import APIService from 'src/services/api.service';

export enum MPU_FAULTS_VALUES {
  ONBOARD_TEMP_FAULT = 1,
  ONBOARD_PEDAL_FAULT = 2,
  IMU_FAULT = 4,
  CAN_DISPATCH_FAULT = 8,
  CAN_ROUTING_FAULT = 16,
  FUSE_MONITOR_FAULT = 32,
  SHUTDOWN_MONITOR_FAULT = 64,
  DTI_ROUTING_FAULT = 128,
  STEERINGIO_ROUTING_FAULT = 256,
  STATE_RECEIVED_FAULT = 512,
  INVALID_TRANSITION_FAULT = 1024,
  BMS_CAN_MONITOR_FAULT = 2048,
  BUTTONS_MONITOR_FAULT = 4096,
  BSPD_PREFAULT = 8192,
  LV_MONITOR_FAULT = 16384,
  BATTERY_THERMISTOR = 32768,
  RTDS_FAULT = 65536
}

export class MPUFault implements Fault {
  name: AllFaultEnums;
  timeTriggered: Date;
  relvantNodesWithData: NodeWithData[];

  /**
   * Constructs a new MPU fault base on a valid faultValue
   * @param faultValue
   * @param timeTriggered
   */
  constructor(
    private serverService: APIService,
    faultValue: MPU_FAULTS_VALUES,
    timeTriggered: Date
  ) {
    this.name = faultValue;
    this.timeTriggered = timeTriggered;
    this.relvantNodesWithData = this.updateRelvantNodes(this.timeTriggered);
  }
  format(): { type: String; name: String; timeTriggered: number } {
    return { type: 'MPU', name: this.name.toString(), timeTriggered: this.timeTriggered.getTime() };
  }
  updateRelvantNodes(timeTriggered: Date): NodeWithData[] {
    return fetchNodeDataOverPeriod(
      ['MPU'],
      timeTriggered.getTime(),
      timeTriggered.getTime() - 30 * 1000,
      this.serverService
    );
  }
}
