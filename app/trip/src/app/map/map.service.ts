import { Injectable } from '@angular/core';
import { ErrObj }      from '../error/errObj';

declare let L: any;
@Injectable()
export class MapService {
 private maps = [];
 public pois = [];
  private layers = [];
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

  drawLine(mapID, layerID, dots, color = 'blue', weight = 4, smooth = 0, opacity = 0.5){
    if (!this.maps[mapID]){
      throw new ErrObj("Map " + mapID + " is not initialized");
    }
    let line = L.polyline(dots, {color: color, weight: weight, smoothFactor: smooth, opacity: opacity});
    this.addObjtoLayer(mapID, layerID, line);
    return line;
  }

  addObjtoLayer(mapID, layerID, obj){
    if (!this.layers[layerID]){
     this.layers[layerID] = new L.LayerGroup([obj]); 
     this.layers[layerID].addTo(this.maps[mapID]);
    }
    else{
      this.layers[layerID].addLayer(obj);
    }
  }

  clearLayer(layerID){
    if (this.layers[layerID]){
      this.layers[layerID].clearLayers();
    }
  }

  decodePolyline(str, precision = null) {
    var index = 0,
        lat = 0,
        lng = 0,
        coordinates = [],
        shift = 0,
        result = 0,
        byte = null,
        latitude_change,
        longitude_change,
        factor = Math.pow(10, precision || 5);

    // Coordinates have variable length when encoded, so just keep
    // track of whether we've hit the end of the string. In each
    // loop iteration, a single coordinate is decoded.
    while (index < str.length) {

        // Reset shift, result, and byte
        byte = null;
        shift = 0;
        result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        shift = result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        lat += latitude_change;
        lng += longitude_change;

        coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
  }
}