import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }      from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import {MapService} from '../map/map.service';
import {GeoService} from '../geo.service';
import {ErrorService} from '../error/error.service';

//declare let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
private results ;
private search: string
private dist = "0";
private map;
private waypoints;
private sub: any;

  constructor(private geo:GeoService, private maps:MapService, private route: ActivatedRoute, private errSvc: ErrorService, private router: Router) { }

  ngOnInit() {
  this.sub = this.route.params.subscribe(params => {
       this.search = params['search'];
    });
    this.waypoints = this.maps.pois;
    //if no waypoints, look up the passed coordinates
    var ar = this.search.split(";")
    var from = ar[0].split(",");

    this.map = this.maps.initMap("map");
    this.map.panTo(new L.LatLng(Number(from[1]), Number(from[0])));
	  this.geo.getRoute(from[1], from[0]).subscribe(response => {

		this.results = response;
		this.dist = this.results.dist;
		let lats = this.results.lats;
    let markers = [];
		for (var i=0; i < lats.length; i++){
      let lat = lats[i].lat;
      let lng =  lats[i].lng;
			markers.push(L.latLng(lat, lng));
			L.marker(L.latLng(lat, lng)).addTo(this.map);
		}
		
      var turns = this.results.turns;
      var dots = [];
      
      for (var i = 0; i < turns.length; i++){
      	let turn = turns[i];
      	dots.push(L.latLng(turn.lat, turn.lng));
      }
      var poly = L.polygon(dots);
      var bounds = poly.getBounds();
      this.map.fitBounds(bounds, {padding: [20,20]});
      
      let line = L.polyline(dots, {color: 'red', weight: 4, smoothFactor: 0, opacity: 0.5});
      line.addTo(this.map);

  	},	
  		error => {console.log(error);
      this.errSvc.recordError(error, this.router);
  	});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  

}
