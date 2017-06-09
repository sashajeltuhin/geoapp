import { Injectable } from '@angular/core';

declare let L: any;
@Injectable()
export class MapService {
 private maps = [];
 public pois = [];

  constructor() { 
   
  }

  initMap(mapid){

    this.maps[mapid] = new L.map(mapid, {
            zoomControl: false,
            zoom: 12,
            minZoom: 4,
            maxZoom: 19
        });
        L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png").addTo(this.maps[mapid]);
        return this.maps[mapid];

  }

  refreshPoi(ar){
  if (ar && ar.length > 0){
      this.pois = [];
      for(var i = 0; i < ar.length; i++){
        this.pois.push(ar[i]);
      }
    }
  }
}