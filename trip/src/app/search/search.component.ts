import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import {GeoService} from '../geo.service';
import {MapService} from '../map/map.service';
import { Poi }      from './poi';
import { Label }      from './labels';
import { SearchModel }      from './searchModel';
import {ErrorService} from '../error/error.service';
import { ErrObj }      from '../error/errObj';

@Component({
  selector: 'geo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private model = new SearchModel();
  private labels = new Label();
  private error;
  private map;
  private markers;
  private frompoints:Poi[];
  private topoints:Poi[];
  private confirmedFrom:Poi;
  private confirmedTo:Poi;

  constructor(private geo:GeoService, private maps:MapService, private errSvc: ErrorService, private router: Router) { 
  }
  
  ngOnInit() {
  this.geo.getLabels()
       .subscribe(
         labels => {
          this.labels = labels
          console.log("this.labels", this.labels);
         },
         error =>  {
         this.error = error;
          this.errSvc.recordError(this.error, this.router);
         });
  this.map = this.maps.initMap("smap");
  var lat = 33.983312;
  var lng = -84.343748;
  if (navigator && navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(pos){
        if (pos){
          lat = pos.coords.latitude;
          lng = pos.coords.longitude;
          console.log("Using Geolocation", lat, lng);
        }
        else{
         console.log("Geolocation not supported");
        }
      }, function(err){
       console.log("Geolocation not supported", err);
      });
    
  }
  else{
    console.log("Geolocation not supported");
  }
  this.map.panTo(new L.LatLng(lat, lng));
 }

  searchFrom(event) {
  if(event.keyCode == 13) {
    	this.runsearchFrom();
      }
  }

  clickFrom(){
    this.runsearchFrom();
  }

  clickTo(){
    this.runsearchTo();
  }

  searchTo(event) {
  if(event.keyCode == 13) {
    this.runsearchTo();
  	}
  }

  runsearchFrom(){
    this.geo.lookup(this.model.from)
                   .subscribe(
                     pois => {this.frompoints = pois
                     if (pois && pois.length == 1){
                        this.confirmFrom(pois[0]);
                     }},
                     error =>  {
                     this.error = error;
                      this.errSvc.recordError(this.error, this.router);
                     });
  }

  runsearchTo(){
    this.geo.lookup(this.model.to)
                   .subscribe(
                     pois => {this.topoints = pois
                     if (pois && pois.length == 1){
                        this.confirmTo(pois[0]);
                     }},
                     error =>  {
                     this.error = error;
                      this.errSvc.recordError(this.error, this.router);
                     });
  }

  confirmFrom(poi){
  if (poi && poi.lat && poi.lng){
    	this.confirmedFrom = poi;
      //this.markers.addLayer(L.marker(L.latLng(this.confirmedFrom.lat, this.confirmedFrom.lng)));
      this.panTo(poi);
    }
  }

  confirmTo(poi){
  if (poi && poi.lat && poi.lng){
  	this.confirmedTo = poi;
    //L.marker(L.latLng(this.confirmedTo.lat, this.confirmedTo.lng)).addTo(this.map);
    this.panTo(poi);
    }
  }

  panTo(poi){
      if (this.markers){
          this.map.removeLayer(this.markers);
      }
    if (this.confirmedFrom && this.confirmedTo){
      var mfrom = L.marker(L.latLng(this.confirmedFrom.lat, this.confirmedFrom.lng))
      var mTo = L.marker(L.latLng(this.confirmedTo.lat, this.confirmedTo.lng))
      this.markers = new L.LayerGroup([mfrom, mTo]);
      this.map.addLayer(this.markers);

      var dots = [];
      dots.push(L.latLng(this.confirmedFrom.lat, this.confirmedFrom.lng));
      dots.push(L.latLng(this.confirmedTo.lat, this.confirmedTo.lng));
      
      var poly = L.polygon(dots);
      var bounds = poly.getBounds();
      this.map.fitBounds(bounds, {padding: [20,20]});
    }
    else if (poi) {
      this.map.panTo(L.latLng(poi.lat, poi.lng))
      this.markers = new L.LayerGroup([L.marker(L.latLng(poi.lat, poi.lng))]);
      this.map.addLayer(this.markers);
    }
  }

  onSubmit(){
    this.maps.refreshPoi([this.confirmedFrom, this.confirmedTo]);
  	let searchString = this.confirmedFrom.lng + "," + this.confirmedFrom.lat + ";" + this.confirmedTo.lng + "," + this.confirmedTo.lat;
  	this.router.navigate(['/map', searchString]);
  }

}
