import { Component, OnInit, inject } from '@angular/core';
import { MapService } from '../../services/map.service';
import { DataValue } from 'src/utils/socket.utils';
import APIService from 'src/services/api.service';
import { getDataByDataTypeNameAndRunId } from 'src/api/data.api';
import { DataTypeEnum } from 'src/data-type.enum';
import Storage from 'src/services/storage.service';
import { Run } from 'src/utils/types.utils';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export default class MapComponent implements OnInit {
  private map = inject(MapService);
  private storage = inject(Storage);
  private apiService = inject(APIService);
  isLoading: boolean = false;
  isError: boolean = false;
  error?: Error;

  ngOnInit() {
    setTimeout(() => {
      this.map.buildMap('map');
    }, 1);
  }

  onRunSelected = (run: Run) => {
    if (run.id === this.storage.getCurrentRunId().value) {
      this.isLoading = false;
      //Allow page to render before building map
      setTimeout(() => {
        this.map.buildMap('map');
        this.map.addPolyline([]);
        this.storage.get(DataTypeEnum.POINTS).subscribe((value) => {
          this.map.addCoordinateToPolyline(this.map.transformDataToCoordinate(value));
        });
      }, 100);
    } else {
      this.isLoading = true;
      const queryResponse = this.apiService.query<DataValue[]>(() =>
        getDataByDataTypeNameAndRunId(DataTypeEnum.POINTS, run.id)
      );
      queryResponse.data.subscribe((points) => {
        this.isLoading = false;
        //Allow page to render before building map
        setTimeout(() => {
          this.map.buildMap('map');
          this.map.addPolyline(points.map(this.map.transformDataToCoordinate));
        }, 100);
      });
      queryResponse.isLoading.subscribe((isLoading) => (this.isLoading = isLoading));
      queryResponse.isError.subscribe((isError) => (this.isError = isError));
      queryResponse.error.subscribe((error) => (this.error = error));
    }
  };
}
