import { NodeWithData } from 'src/utils/types.utils';
import { AllFaultNames, Fault } from '../fault.model';
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

export enum MPU_FAULT_NAMES {
  ONBOARD_TEMP_FAULT = 'Onboard Temp Fault',
  ONBOARD_PEDAL_FAULT = 'Onboard Pedal Fault',
  IMU_FAULT = 'IMU Fault',
  CAN_DISPATCH_FAULT = 'CAN Dispatch Fault',
  CAN_ROUTING_FAULT = 'CAN Routing Fault',
  FUSE_MONITOR_FAULT = 'Fuse Monitor Fault',
  SHUTDOWN_MONITOR_FAULT = 'Shutdown Monitor Fault',
  DTI_ROUTING_FAULT = 'DTI Routing Fault',
  STEERINGIO_ROUTING_FAULT = 'Steering IO Routing Fault',
  STATE_RECEIVED_FAULT = 'State Received Fault',
  INVALID_TRANSITION_FAULT = 'Invalid Transition Fault',
  BMS_CAN_MONITOR_FAULT = 'BMS CAN Monitor Fault',
  BUTTONS_MONITOR_FAULT = 'Buttons Monitor Fault',
  BSPD_PREFAULT = 'BSPD Prefault',
  LV_MONITOR_FAULT = 'LV Monitor Fault',
  BATTERY_THERMISTOR = 'Battery Thermistor',
  RTDS_FAULT = 'RTDS Fault'
}

export class MPUFault implements Fault {
  name: MPU_FAULT_NAMES;
  timeTriggered: number;
  relvantNodesWithData: NodeWithData[];

  /**
   * Constructs a new MPU fault base on a valid faultValue
   * @param faultValue
   * @param timeTriggered
   */
  constructor(
    private serverService: APIService,
    faultValue: MPU_FAULTS_VALUES,
    timeTriggered: number
  ) {
    this.name = this.getMPUFaultName(faultValue);
    this.timeTriggered = timeTriggered;
    this.relvantNodesWithData = this.updateRelvantNodes(this.timeTriggered);
  }
  format(): { type: string; name: string; time: string } {
    return { type: 'MPU', name: this.name.toString(), time: new Date(this.timeTriggered).toLocaleTimeString() };
  }
  updateRelvantNodes(timeTriggered: number): NodeWithData[] {
    return [fetchNodeDataOverPeriod('MPU', timeTriggered, this.serverService)];
  }

  getMPUFaultName(faultValue: MPU_FAULTS_VALUES): MPU_FAULT_NAMES {
    switch (faultValue) {
      case MPU_FAULTS_VALUES.ONBOARD_TEMP_FAULT:
        return MPU_FAULT_NAMES.ONBOARD_TEMP_FAULT;
      case MPU_FAULTS_VALUES.ONBOARD_PEDAL_FAULT:
        return MPU_FAULT_NAMES.ONBOARD_PEDAL_FAULT;
      case MPU_FAULTS_VALUES.IMU_FAULT:
        return MPU_FAULT_NAMES.IMU_FAULT;
      case MPU_FAULTS_VALUES.CAN_DISPATCH_FAULT:
        return MPU_FAULT_NAMES.CAN_DISPATCH_FAULT;
      case MPU_FAULTS_VALUES.CAN_ROUTING_FAULT:
        return MPU_FAULT_NAMES.CAN_ROUTING_FAULT;
      case MPU_FAULTS_VALUES.FUSE_MONITOR_FAULT:
        return MPU_FAULT_NAMES.FUSE_MONITOR_FAULT;
      case MPU_FAULTS_VALUES.SHUTDOWN_MONITOR_FAULT:
        return MPU_FAULT_NAMES.SHUTDOWN_MONITOR_FAULT;
      case MPU_FAULTS_VALUES.DTI_ROUTING_FAULT:
        return MPU_FAULT_NAMES.DTI_ROUTING_FAULT;
      case MPU_FAULTS_VALUES.STEERINGIO_ROUTING_FAULT:
        return MPU_FAULT_NAMES.STEERINGIO_ROUTING_FAULT;
      case MPU_FAULTS_VALUES.STATE_RECEIVED_FAULT:
        return MPU_FAULT_NAMES.STATE_RECEIVED_FAULT;
      case MPU_FAULTS_VALUES.INVALID_TRANSITION_FAULT:
        return MPU_FAULT_NAMES.INVALID_TRANSITION_FAULT;
      case MPU_FAULTS_VALUES.BMS_CAN_MONITOR_FAULT:
        return MPU_FAULT_NAMES.BMS_CAN_MONITOR_FAULT;
      case MPU_FAULTS_VALUES.BUTTONS_MONITOR_FAULT:
        return MPU_FAULT_NAMES.BUTTONS_MONITOR_FAULT;
      case MPU_FAULTS_VALUES.BSPD_PREFAULT:
        return MPU_FAULT_NAMES.BSPD_PREFAULT;
      case MPU_FAULTS_VALUES.LV_MONITOR_FAULT:
        return MPU_FAULT_NAMES.LV_MONITOR_FAULT;
      case MPU_FAULTS_VALUES.BATTERY_THERMISTOR:
        return MPU_FAULT_NAMES.BATTERY_THERMISTOR;
      case MPU_FAULTS_VALUES.RTDS_FAULT:
        return MPU_FAULT_NAMES.RTDS_FAULT;
      default:
        throw new Error('Invalid MPU fault value');
    }
  }
}
