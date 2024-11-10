import { NodeWithData } from 'src/utils/types.utils';
import { BMS_FAULT_NAMES } from './indiv-fault/bms-fault.model';
import { DTI_FAULTS_NAMES } from './indiv-fault/dti-fault.model';
import { MPU_FAULT_NAMES } from './indiv-fault/mpu-fault.model';
import { CHARGER_FAULT_NAMES } from './indiv-fault/charger-fault.model';

export interface Fault {
  name: AllFaultNames;
  timeTriggered: number; // number in Unix, epoch time in ms since 1970
  relvantNodesWithData: NodeWithData[]; // should be made on construction
  format(): { type: string; name: string; time: string };
  updateRelvantNodes(timeTriggered: number): NodeWithData[];
}

export type AllFaultNames = BMS_FAULT_NAMES | CHARGER_FAULT_NAMES | DTI_FAULTS_NAMES | MPU_FAULT_NAMES;
