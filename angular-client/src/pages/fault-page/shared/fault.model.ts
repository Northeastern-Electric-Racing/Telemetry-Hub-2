import { Node } from 'src/utils/types.utils';
import { BMS_FAULTS_VALUES } from './indiv-fault/bms-fault.model';
import { CHARGER_FAULT_VALUES } from './indiv-fault/charger-fault.model';
import { DTI_FAULTS_VALUES } from './indiv-fault/dti-fault.model';
import { MPU_FAULTS_VALUES } from './indiv-fault/mpu-fault.model';

export interface Fault {
  name: AllFaultEnums;
  timeTriggered: number;
  format(): { type: String; name: String; timeTriggered: number };
  getRelevantNodes(timeFrame: number): Node[];
}

export type AllFaultEnums = BMS_FAULTS_VALUES | CHARGER_FAULT_VALUES | DTI_FAULTS_VALUES | MPU_FAULTS_VALUES;
