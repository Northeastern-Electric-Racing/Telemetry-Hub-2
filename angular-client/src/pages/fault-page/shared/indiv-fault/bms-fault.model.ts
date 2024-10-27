import { NodeWithData } from 'src/utils/types.utils';
import { Fault } from '../fault.model';
import APIService from 'src/services/api.service';
import { getNodesWithData, getSingleNodeWithData } from 'src/api/node.api';

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

export class BMSFault implements Fault {
  name: BMS_FAULTS_VALUES;
  timeTriggered: Date;
  relvantNodesWithData: NodeWithData[];
  faultSpecificNode!: NodeWithData;

  /**
   * Constructs a new BMS fault base on a valid faultValue
   * @param faultValue
   * @param timeTriggered
   */
  constructor(
    private serverService: APIService,
    faultValue: BMS_FAULTS_VALUES,
    timeTriggered: Date
  ) {
    this.name = faultValue;
    this.timeTriggered = timeTriggered;
    this.relvantNodesWithData = this.fetchAndStoreNodes();
    if (!this.faultSpecificNode) {
      throw Error();
    }
  }

  fetchAndStoreNodes(): NodeWithData[] {
    let nodeDataIsLoading;
    let nodeDataError!: Error;
    let isNodeDataError!: boolean;
    const allNodesAt30Seconds = this.serverService.query<NodeWithData[]>(() =>
      getNodesWithData(this.timeTriggered.getTime(), this.timeTriggered.getTime() - 30 * 1000)
    );
    allNodesAt30Seconds.isLoading.subscribe((isLoading: boolean) => {
      nodeDataIsLoading = isLoading;
    });
    allNodesAt30Seconds.error.subscribe((error: Error) => {
      nodeDataError = error;
      isNodeDataError = true;
    });
    allNodesAt30Seconds.data.subscribe((data: NodeWithData[]) => {
      console.log(data);
      this.relvantNodesWithData = data;
    });

    if (nodeDataIsLoading) {
      // TODO: what do I add here
    }

    if (isNodeDataError) {
      throw nodeDataError;
    }

    let faultSpecifcNodeIsLoading!: boolean;
    let faultNodeError!: Error;
    let isFaultNodeError!: boolean;
    // query the specific node for this fault, at 60 seconds
    const faulSpecifcNode = this.serverService.query<NodeWithData>(() =>
      getSingleNodeWithData('BMS', this.timeTriggered.getTime() - 30 * 1000, this.timeTriggered.getTime())
    );
    faulSpecifcNode.isLoading.subscribe((isLoading: boolean) => {
      faultSpecifcNodeIsLoading = isLoading;
    });
    faulSpecifcNode.error.subscribe((error: Error) => {
      faultNodeError = error;
      isFaultNodeError = true;
    });
    faulSpecifcNode.data.subscribe((data: NodeWithData) => {
      console.log(data);
      // replace the original 30 second query for this faults specific node
      // with this 60 second query
      this.relvantNodesWithData.map((nodeWithData) => {
        if (nodeWithData.name === data.name) {
          return data;
        }
        return nodeWithData;
      });
    });

    if (faultSpecifcNodeIsLoading) {
      // TODO: what do I add here
    }

    if (isFaultNodeError) {
      throw faultNodeError;
    }

    return this.relvantNodesWithData;
  }

  format(): { type: String; name: String; timeTriggered: number } {
    throw new Error('Method not implemented.');
  }
}
