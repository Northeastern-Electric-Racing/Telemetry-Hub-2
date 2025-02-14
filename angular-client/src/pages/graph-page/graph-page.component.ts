import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { getDataByDataTypeNameAndRunId } from 'src/api/data.api';
import { getAllDatatypes } from 'src/api/datatype.api';
import { getAllRuns } from 'src/api/run.api';
import APIService from 'src/services/api.service';
import Storage from 'src/services/storage.service';
import { DataValue } from 'src/utils/socket.utils';
import { DataType, GraphData, Run } from 'src/utils/types.utils';

@Component({
  selector: 'graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.css']
})
export default class GraphPageComponent implements OnInit {
  private serverService = inject(APIService);
  private storage = inject(Storage);
  private toastService = inject(MessageService);
  realTime: boolean = true;

  dataTypes?: DataType[];
  dataTypesIsLoading = true;
  dataTypesIsError = false;
  dataTypesError?: Error;

  run?: Run;

  allRuns!: Run[];
  runsIsLoading = true;

  previousDataType?: DataType;

  selectedDataType: Subject<DataType> = new Subject<DataType>();
  selectedDataTypeValuesSubject: BehaviorSubject<GraphData[]> = new BehaviorSubject<GraphData[]>([]);
  currentValue: Subject<DataValue | undefined> = new Subject<DataValue | undefined>();
  selectedDataTypeValuesIsLoading = false;
  selectedDataTypeValuesIsError = false;
  selectedDataTypeValuesError?: Error;
  subscription?: Subscription;

  ngOnInit(): void {
    this.queryDataTypes();

    const runsQueryResponse = this.serverService.query<Run[]>(() => getAllRuns(), { queryKey: ['runs'] });
    runsQueryResponse.isLoading.subscribe((isLoading: boolean) => {
      this.runsIsLoading = isLoading;
    });
    runsQueryResponse.error.subscribe((error) => {
      if (error) {
        this.toastService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    });
    runsQueryResponse.data.subscribe((data) => {
      if (data) {
        this.allRuns = data;
      }
    });

    this.clearDataType = () => {
      if (this.subscription) this.subscription.unsubscribe();
      this.selectedDataType.next({ name: '', unit: '' });
      this.selectedDataTypeValuesSubject = new BehaviorSubject<GraphData[]>([]);
    };

    this.setSelectedDataType = (dataType: DataType) => {
      this.selectedDataType.next(dataType);
      this.selectedDataTypeValuesSubject = new BehaviorSubject<GraphData[]>([]);
      if (this.realTime) {
        if (this.subscription) this.subscription.unsubscribe();
        const key = dataType.name;
        const valuesSubject = this.storage.get(key);
        this.subscription = valuesSubject.subscribe((value: DataValue) => {
          /* Take only data from the last minute */
          const now = new Date();
          const lastMinute = new Date(now.getTime() - 60000);
          const storedValues = this.selectedDataTypeValuesSubject.getValue();
          storedValues.push({ x: +value.time, y: +value.values[0] });
          const nextValue = storedValues.filter((v) => new Date(v.x) > lastMinute);

          this.currentValue.next(value);
          this.selectedDataTypeValuesSubject.next(nextValue);
        });
      } else if (this.run !== undefined) {
        this.selectedDataTypeValuesIsLoading = true;
        this.selectedDataTypeValuesIsError = false;
        this.selectedDataTypeValuesError = undefined;

        const dataQueryResponse = this.serverService.query<DataValue[]>(() =>
          getDataByDataTypeNameAndRunId(dataType.name, this.run!.id)
        );
        dataQueryResponse.isLoading.subscribe((isLoading: boolean) => {
          this.selectedDataTypeValuesIsLoading = isLoading;
        });
        dataQueryResponse.error.subscribe((error) => {
          if (error) {
            this.selectedDataTypeValuesError = error;
            this.selectedDataTypeValuesIsError = true;
          }
        });
        dataQueryResponse.data.subscribe((data) => {
          if (data) {
            this.selectedDataTypeValuesSubject.next(data.map((value) => ({ x: +value.time, y: +value.values[0] })));
            this.currentValue.next(data.pop());
          }
        });
      } else {
        this.toastService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No run selected Please select a run. Choose most recent for real time.'
        });
      }
    };
  }

  onRunSelected = (run: Run) => {
    this.run = run;
    this.realTime = run.id === this.storage.getCurrentRunId().value;
    this.selectedDataTypeValuesSubject.next([]);
    this.selectedDataTypeValuesIsLoading = false;
    this.selectedDataTypeValuesIsError = false;
    this.selectedDataTypeValuesError = undefined;
  };

  onSetRealtime = () => {
    const currentRunId = this.storage.getCurrentRunId().value;
    if (currentRunId) {
      this.run = this.allRuns.find((run) => run.id === currentRunId);
      this.realTime = true;
      this.selectedDataTypeValuesSubject.next([]);
      this.selectedDataTypeValuesIsLoading = false;
      this.selectedDataTypeValuesIsError = false;
      this.selectedDataTypeValuesError = undefined;
    }
  };

  /**
   * Queries the datatypes from the server.
   */
  private queryDataTypes() {
    const dataTypesQueryResponse = this.serverService.query<DataType[]>(getAllDatatypes);
    dataTypesQueryResponse.isLoading.subscribe((isLoading: boolean) => {
      this.dataTypesIsLoading = isLoading;
    });
    dataTypesQueryResponse.error.subscribe((error) => {
      if (error) {
        this.dataTypesIsError = true;
        this.dataTypesError = error;
      }
    });
    dataTypesQueryResponse.data.subscribe((data) => {
      if (data) {
        this.dataTypes = data;
      }
    });
  }

  /**
   * Sets the selected data type.
   * @param dataType The data type to set.
   */
  setSelectedDataType!: (dataType: DataType) => void;

  clearDataType!: () => void;
}
