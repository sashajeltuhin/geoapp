exports.lookup = function(req, res, next){
	var obj = req.body;
    var place = obj.place;
    var latlng = obj.latlng;
    var wayObj = obj.way;
    console.log("lookup called", obj);
    
    lookup(latlng, place, wayObj, function (err, recs) {
        console.log("lookup returned", recs, err);
        if (err) {
            next(err);
        }
        else {
            res.send(recs);
        }
    });

}

exports.getLabels = function(req, res, next){
    var labels = {};
    labels.title = process.env['GEO_TITLE'] || "Running on ";
    labels.placeholder = process.env['GEO_PLACEHOLDER'] || "Enter a landmark or address";
    console.log("Labels", labels);
    res.send(labels);
}

exports.testmap = function (req, res, next){
    try{
    var search = req.params.search;
    var rq = require('request');
    var url = "http://osrm-api:5000";
    var path = "/route/v1/driving/^^search^^?steps=true";
    var answer = null;
    path = path.replace("^^search^^", search);
    console.log("Path", path);
    rq({
                method: 'GET',
                uri: url + path,
                strictSSL: false
            }, function (err, response, body) {
                if (!err) {
                    var r = JSON.parse(body);
                    if (r && r["code"] == 'Ok') {
                        console.log("All is well", r, r["routes"]);
                        answer = {};
                        answer.dist = r["routes"][0]["distance"];
                        var waypoints = r["waypoints"];
                        answer.lats = [];
                        var from, to;
                        for (var i=0; i < waypoints.length; i++){
                            var lat = waypoints[i].location[1];
                            var lon =  waypoints[i].location[0];
                            answer.lats.push({"lat":lat, "lng": lon});
                        }

                        from = answer.lats[0];
                          to = answer.lats[answer.lats.length - 1];
                        

                        answer.turns = [];
                        answer.turns.push(from);
                        var steps = r["routes"][0].legs[0].steps;
                        for (var i = 0; i < steps.length; i++){
                            var step = steps[i];
                            answer.turns.push({"lat": step.maneuver.location[1], "lng": step.maneuver.location[0]});
                        }
                        answer.turns.push(to);
                        console.log(answer);
                        res.send(answer);
                    }
                    else{
                        next("Unable to look up location. " + r["code"]);
                    }
                }
                else {
                    next("Unable to look up location. " + err);
                }
            });
    }
    catch(e){
        next("Unable to map the way. " + e);
    }
}

exports.mapWay = function (req, res, next){
    try{
        var rq = require('request');
    var url = "http://osrm-api:5000";
    var obj = req.body;
    var path = "/route/v1/driving/^^search^^?steps=true";
    var answer = null;
    path = path.replace("^^search^^", obj.search);
    console.log("Path", path);
    rq({
                method: 'GET',
                uri: url + path,
                strictSSL: false
            }, function (err, response, body) {
                if (!err) {
                    var r = JSON.parse(body);
                    if (r && r["code"] == 'Ok') {
                        console.log("All is well", r, r["routes"]);
                        answer = {};
                        answer.dist = r["routes"][0]["distance"];
                        var waypoints = r["waypoints"];
                        answer.lats = [];
                        var from, to;
                        for (var i=0; i < waypoints.length; i++){
                            var lat = waypoints[i].location[1];
                            var lon =  waypoints[i].location[0];
                            answer.lats.push({"lat":lat, "lng": lon});
                        }

                        from = answer.lats[0];
                          to = answer.lats[answer.lats.length - 1];
                        

                        answer.turns = [];
                        answer.turns.push(from);
                        var steps = r["routes"][0].legs[0].steps;
                        for (var i = 0; i < steps.length; i++){
                            var step = steps[i];
                            answer.turns.push({"lat": step.maneuver.location[1], "lng": step.maneuver.location[0]});
                            for (var j = 0; j < step.intersections.length; j++){
                                answer.turns.push({"lat": step.intersections[j].location[1], "lng": step.intersections[j].location[0]})
                            }
                        }
                        answer.turns.push(to);
                        console.log(answer);
                        res.send(answer);
                    }
                    else{
                        next("Unable to look up location. " + r["code"]);
                    }
                }
                else {
                    next("Unable to look up location. " + err);
                }
            });
    }
    catch(e){
        next("Unable to map the way. " + e);
    }
}

function lookup(latlng, place, wayObj, callback){
	 try {
        console.log("env", process.env);
	 	var apikey = process.env['GEO_KEY'];
        console.log("Api Key", apikey)
        var rq = require('request');
        if (wayObj) {
            mapWay(wayObj, res);
        }
        else {
            var path;
            
            if (place) {
                place = place.replace(' ', '%20');
                path = "/maps/api/geocode/json?address=" + place;
            } else if (latlng) {
                path = "/maps/api/geocode/json?latlng=" + latlng[0] + ',' + latlng[1];
            }
            path = path + "&key=" + apikey;
            console.log("lookup path", path);
            var retobj = [];
            //svc.getData(ipURL, 80, path, function(err, response){
            rq({
                method: 'GET',
                uri: 'https://maps.googleapis.com' + path,
                strictSSL: false
            }, function (err, response, body) {
                if (err == null) {
                    var r = JSON.parse(body);
                    console.log("results", r);
                    if (r["results"] && r["status"] == 'OK') {
                        var list = r["results"];
                        console.log("List length", list.length);
                        if (list.length > 0) {
                            var i = 0;
                            processLookup(i, list, place, retobj, callback);
                        }
                        else{
                            callback("No results ", null);
                        }
                    }
                    else{
                        callback("Unable to look up location. " + r["status"], null);
                    }
                }
                else {
                    callback("Unable to look up location. " + err, null);
                }
            });
        }
    }
    catch(e){
        callback("Unable to look up location. " + e, null);
    }
}

function isRequestedType(types){
    var found = false;
    var requested = ["establishment", "locality", "point_of_interest", "street_address"];
    if (types && types.length > 0){
        for(var i=0; i < types.length; i++){
            if (requested.indexOf(types[i]) >=0 ){
                found = true;
                break;
            }
        }
    }
    return found;
}

function processLookup(i, list, place, retobj, callback){
    var poi = {};
    poi.loc = {};
    poi.name = place.replace('%20', ' ');
    poi.loc.type = "Point";
    poi.type = "place";

    var types;
    var loc = list[i];
    if (loc['geometry'] && loc['geometry']['location']) {
        poi.lat = loc['geometry']['location']['lat'];
        poi.lng = loc['geometry']['location']['lng'];
        poi.loc.coordinates = [loc['geometry']['location']['lng'], loc['geometry']['location']['lat']];
    }
    var types;
    if (loc['types'] && loc['types'].length > 0) {
        types = loc['types'];
    }

    if (loc['place_id']) {
        poi.id = loc['place_id'];
    }
    if (loc["formatted_address"]){
        poi.address = loc["formatted_address"];
    }
    if (isRequestedType(types) && loc["address_components"] && loc["address_components"].length > 0) {
        for (var c = 0; c < loc["address_components"].length; c++) {
            var add = loc["address_components"][c];
            if (add['types'] && add['types'].length > 0) {
                if (add['types'][0] == 'locality') {
                    poi.city = add["long_name"];
                }
                else if (add['types'][0] == 'country') {
                    poi.country = add["long_name"];
                }
                else if (add['types'][0] == 'administrative_area_level_1') {
                    poi.state = add["long_name"];
                }
                else if (add['types'][0] == 'neighborhood') {
                        poi.district = add["long_name"];
                }
                if (add['types'][0] == 'route') {
                        poi.street = add["long_name"];
                }
                if (add['types'][0] == 'street_number') {
                        poi.number = add["long_name"];
                }
            }
        }
        retobj.push(poi);
        i++;
        if (i == list.length) {
            console.log("Calling back with poi");
            callback(null, retobj);
        }
        else{
            console.log("Another round");
            processLookup(i, list, place, retobj, callback);
        }	
        // db.saveDataObj(org.dbname, 'poi', poi, null, null, function (err, saved) {
        //     if (!err) {
        //         retobj.push(saved);
        //     }
        //     i++;
        //     if (i == list.length) {
        //         callback(null, retobj);
        //     }
        //     else{
        //         processLookup(org, i, list, place, retobj, callback);
        //     }
        // });
    }
    else{
        i++;
        if (i == list.length) {
            callback(null, retobj);
        }
        else{
            processLookup(i, list, place, retobj, callback);
        }
    }

}

exports.lookupNearBy = function(req, res, next){
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.52000659999999,13.404954&radius=5000&type=museum&name=Pergam&key=AIzaSyAUM4x5YKXna7iiD7uUB0C7JpBctgWk1fw
try{
    var rq = require('request');
    var ipURL = 'https://maps.googleapis.com';
    var obj = req.body;
    var place = obj.place;
    var latlng = obj.latlng;
    var radius = obj.radius;
    var poitype = obj.poitype;

    var path = "/maps/api/place/nearbysearch/json?location=" + latlng[0] + ',' + latlng[1] + "&radius=" + radius + "&type=" + poitype;
    if (place) {
        place = place.replace(' ', '%20');
        path = path + "&name" + place;
    }
    path = path + "&key=AIzaSyArQ_pO6SIjlEPZCNI-zMawhCHr6YIKlHk";

    var retobj = [];
    rq({
        method: 'GET',
        uri: ipURL  + path,
        strictSSL: false
        }, function (err, response, body) {
            if (err == null) {
                var r = JSON.parse(body);
                if (r["results"] && r["status"] == 'OK'){
                var list = r["results"];
                for (var i = 0; i < list.length; i++){
                    var poi = {};
                    poi.type = poitype;
                    poi.loc = {};
                    poi.loc.type = "Point";
                    var types;
                    var loc = list[i];
                    if (loc['geometry'] && loc['geometry']['location']){
                        poi.lat = loc['geometry']['location']['lat'];
                        poi.lng = loc['geometry']['location']['lng'];
                        poi.loc.coordinates = [loc['geometry']['location']['lng'], loc['geometry']['location']['lat']];
                    }
                    poi.name = loc['name'];
                    if (loc['place_id']){
                        poi.id = loc['place_id'];
                    }
                    if (loc['icon']){
                        poi.iconUrl = loc['icon'];
                    }
                    if (loc['vicinity']){
                        poi.address = loc['vicinity'];
                    }

                    retobj.push(poi);
                }
                res.send(retobj);
            }
            else{
                next("Unable to do nearby serch. " + r["status"]);
            }   
        }
        else{
            next("Unable to do nearby serch. " + err);
        }
    });
  }
  catch(e){
        next("Unable to do nearby serch. " + e);
  }
}