import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import {GeoService} from '../geo.service';
import {MapService} from '../map/map.service';
import { Poi }      from './poi';
import { Label }      from './labels';
import { SearchModel }      from './searchModel';
import {ErrorService} from '../error/error.service';
import { ErrObj }      from '../error/errObj';

declare let L: any;

@Component({
  selector: 'geo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private model = new SearchModel();
  private labels = new Label();
  private savedSearches:Poi[];
  private error;
  private map;
  private markers;
  private frompoints:Poi[];
  private topoints:Poi[];
  private confirmedFrom:Poi;
  private confirmedTo:Poi;
  private dist = 0;
  private mapID = "smap";
  private roadLayer = "roads-new";
  private hack;
  private hackAnswer;
  private nosecrets = true;
  private showSearches = false;

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

  this.geo.loadSearches()
       .subscribe(
         savedSearches => {
          this.savedSearches = savedSearches
          console.log("this.savedSearches", this.savedSearches);
         },
         error =>  {
         console.log("savedSearches", error)
         });
  this.map = this.maps.initMap("smap");
  var lat = 33.983312;
  var lng = -84.343748;
  if (navigator && navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos => {
        if (pos){
          lat = pos.coords.latitude;
          lng = pos.coords.longitude;
          console.log("Using Geolocation", lat, lng);
          var poi = new Poi();
          poi.name = "Current location";
          this.model.from = poi.name;
          poi.lat = lat;
          poi.lng = lng;
          this.confirmFrom(poi);
        }
        else{
         console.log("Geolocation not supported");
        }
        this.map.panTo(new L.LatLng(lat, lng));
      }, function(err){
        this.map.panTo(new L.LatLng(lat, lng));
       console.log("Geolocation not supported", err);
      });
    
  }
  else{
    console.log("Geolocation not supported");
    this.map.panTo(new L.LatLng(lat, lng));
  }
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
  console.log("click to")
    this.runsearchTo();
  }

  searchTo(event) {
  if(event.keyCode == 13) {
    console.log("searchTo kode 13")
    this.runsearchTo();
  	}
  }

  runsearchFrom(){
    if (this.model.from){
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
  }

  runsearchTo(){
  if (this.model.to){
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
  }

  confirmFrom(poi){
  if (poi && poi.lat && poi.lng){
    	this.confirmedFrom = poi;
      //this.markers.addLayer(L.marker(L.latLng(this.confirmedFrom.lat, this.confirmedFrom.lng)));
      this.panTo(poi);
    }
  }

  confirmTo(poi){
  console.log("confirm to", poi);
  if (poi && poi.lat && poi.lng){
  	this.confirmedTo = poi;
    //L.marker(L.latLng(this.confirmedTo.lat, this.confirmedTo.lng)).addTo(this.map);
    this.panTo(poi);
    console.log("assigning the name to poi");
    poi.name = this.model.to;
    console.log("confirm to saving");
    this.geo.saveConfirmed(poi).subscribe( saved => {
                        console.log(saved);
                     },
                     error =>  {
                     console.log(error)
                     });
    }
  }

  confirmSaved(poi){
  if (poi && poi.lat && poi.lng){
    this.confirmedTo = poi;
    //L.marker(L.latLng(this.confirmedTo.lat, this.confirmedTo.lng)).addTo(this.map);
    this.panTo(poi);
    this.model.to = poi.name;
    }
  }

  deletePoi(poi){
    this.geo.deletePoi(poi).subscribe(answer => {
                        console.log(answer);
                        for (var i = this.savedSearches.length - 1; i >=0; i--){
                          if (poi.id === this.savedSearches[i].id){
                            this.savedSearches.splice(i, 1);
                            break;
                          }
                        }
                     },
                     error =>  {
                     console.log(error)
                     });
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
      //run route
      this.onSubmit();
    }
    else if (poi) {
      this.map.panTo(L.latLng(poi.lat, poi.lng))
      this.markers = new L.LayerGroup([L.marker(L.latLng(poi.lat, poi.lng))]);
      this.map.addLayer(this.markers);
    }
  }

  onSubmit(){
  if (this.confirmedFrom && this.confirmedFrom.lat && this.confirmedFrom.lng && this.confirmedTo && this.confirmedTo.lng && this.confirmedTo.lat){
    this.buildRoute(this.confirmedFrom, this.confirmedTo);
    }
  }

  buildRoute(fromPoi, toPoi){
  try{
      let from:any = {latlng: [fromPoi.lat, fromPoi.lng]};
      let to:any = {latlng: [toPoi.lat, toPoi.lng]};
      this.geo.getRoute(from, to).subscribe(response => {
          var routes = response;
          if (routes.length > 0){
            var preferred = routes[0];
            this.dist += preferred.dist;
          
            var turns = preferred.turns;
            var dots = [];
            
            for (var i = 0; i < turns.length; i++){
              let turn = turns[i];
              if (turn.lat && turn.lng){
                dots.push(L.latLng(turn.lat, turn.lng));
              }
              else if(turn.line){
                var arr = this.maps.decodePolyline(turn.line);
                for (var ii = 0; ii < arr.length; ii++){
                  dots.push(L.latLng(arr[ii][0], arr[ii][1]));
                }
              }
            }
            this.maps.drawLine(this.mapID, this.roadLayer, dots);
          }
        },  
          error => {console.log(error);
          this.errSvc.recordError(error, this.router);
        });
    }
    catch(e){
      console.log("Issues with the routes" + e);
    }
  }

  onHack(event){
    if(event.keyCode == 13) {
     this.hackIt();
    }
  }

  hackIt(){
    this.geo.hack(this.hack)
       .subscribe(
         data => {
          this.hackAnswer = JSON.stringify(data);
          console.log("Hack Data:", this.hackAnswer);
         },
         error =>  {
         this.error = error;
         console.log(this.error);
         if (error.msg){
          this.hackAnswer = error.msg;
         }
         else{
          this.hackAnswer = error;
         }
         });
  }

  toggleSecrets(){
      this.nosecrets = !this.nosecrets;
  }

  toggleSearches(){
    this.showSearches = !this.showSearches;
  }

}
