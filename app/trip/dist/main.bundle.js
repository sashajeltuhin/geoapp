webpackJsonp([1,4],{

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__handler_service__ = __webpack_require__(198);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthService = (function () {
    function AuthService(http, handler) {
        this.http = http;
        this.handler = handler;
        this.isLoggedIn = false;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        if (this.token) {
            this.isLoggedIn = true;
        }
        console.log("token in store", this.token, this.isLoggedIn);
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('/api/login', JSON.stringify({ email: username, password: password }), { headers: this.headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                _this.isLoggedIn = true;
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        }).catch(this.handler.handleError);
    };
    AuthService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.isLoggedIn = false;
        localStorage.removeItem('currentUser');
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__handler_service__["a" /* HandlerService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__handler_service__["a" /* HandlerService */]) === 'function' && _b) || Object])
    ], AuthService);
    return AuthService;
    var _a, _b;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/auth.service.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error_errObj__ = __webpack_require__(197);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MapService = (function () {
    function MapService() {
        this.maps = [];
        this.pois = [];
        this.layers = [];
    }
    MapService.prototype.initMap = function (mapid) {
        this.maps[mapid] = new L.map(mapid, {
            zoomControl: false,
            zoom: 12,
            minZoom: 4,
            maxZoom: 19
        });
        L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png").addTo(this.maps[mapid]);
        return this.maps[mapid];
    };
    MapService.prototype.refreshPoi = function (ar) {
        if (ar && ar.length > 0) {
            this.pois = [];
            for (var i = 0; i < ar.length; i++) {
                this.pois.push(ar[i]);
            }
        }
    };
    MapService.prototype.drawLine = function (mapID, layerID, dots, color, weight, smooth, opacity) {
        if (color === void 0) { color = 'blue'; }
        if (weight === void 0) { weight = 4; }
        if (smooth === void 0) { smooth = 0; }
        if (opacity === void 0) { opacity = 0.5; }
        if (!this.maps[mapID]) {
            throw new __WEBPACK_IMPORTED_MODULE_1__error_errObj__["a" /* ErrObj */]("Map " + mapID + " is not initialized");
        }
        var line = L.polyline(dots, { color: color, weight: weight, smoothFactor: smooth, opacity: opacity });
        this.addObjtoLayer(mapID, layerID, line);
        return line;
    };
    MapService.prototype.addObjtoLayer = function (mapID, layerID, obj) {
        if (!this.layers[layerID]) {
            this.layers[layerID] = new L.LayerGroup([obj]);
            this.layers[layerID].addTo(this.maps[mapID]);
        }
        else {
            this.layers[layerID].addLayer(obj);
        }
    };
    MapService.prototype.clearLayer = function (layerID) {
        if (this.layers[layerID]) {
            this.layers[layerID].clearLayers();
        }
    };
    MapService.prototype.decodePolyline = function (str, precision) {
        if (precision === void 0) { precision = null; }
        var index = 0, lat = 0, lng = 0, coordinates = [], shift = 0, result = 0, byte = null, latitude_change, longitude_change, factor = Math.pow(10, precision || 5);
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
    };
    MapService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], MapService);
    return MapService;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/map.service.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrObj; });
var ErrObj = (function () {
    function ErrObj(msg) {
        this.msg = msg;
    }
    return ErrObj;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/errObj.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__error_errObj__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HandlerService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HandlerService = (function () {
    function HandlerService() {
    }
    HandlerService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Response */]) {
            var body = void 0;
            var valid = true;
            try {
                body = error.json();
            }
            catch (ex) {
                valid = false;
            }
            var err = "";
            if (valid) {
                err = body.error || JSON.stringify(body);
            }
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        var errObj = new __WEBPACK_IMPORTED_MODULE_2__error_errObj__["a" /* ErrObj */](errMsg);
        errObj.code = error.status;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(errObj);
    };
    HandlerService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], HandlerService);
    return HandlerService;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/handler.service.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(134);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        return this.checkLogin(url);
    };
    AuthGuard.prototype.checkLogin = function (url) {
        if (this.authService.isLoggedIn) {
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/authguard.service.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__person__ = __webpack_require__(593);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.person = new __WEBPACK_IMPORTED_MODULE_3__person__["a" /* Person */]();
        this.setMessage();
    }
    LoginComponent.prototype.setMessage = function () {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.message = 'Trying to log in ...';
        this.authService.login(this.person.email, this.person.pass).subscribe(function () {
            _this.setMessage();
            if (_this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                var redirect = _this.authService.redirectUrl;
                if (!redirect) {
                    redirect = "/";
                }
                // Redirect the user
                _this.router.navigate([redirect]);
            }
            else {
                _this.message = 'Invalid credentials ...';
            }
        }, function (error) {
            console.log(error);
            _this.message = error.msg;
        });
    };
    LoginComponent.prototype.logout = function () {
        this.authService.logout();
        this.setMessage();
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'login-form',
            template: __webpack_require__(714)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/login.component.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errObj__ = __webpack_require__(197);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ErrorComponent = (function () {
    function ErrorComponent(svc) {
        this.svc = svc;
    }
    ErrorComponent.prototype.ngOnInit = function () {
        this.errObj = this.svc.getError();
        if (!this.errObj) {
            this.errObj = new __WEBPACK_IMPORTED_MODULE_2__errObj__["a" /* ErrObj */]("Everything is ok. False alarm");
        }
    };
    ErrorComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-error',
            template: __webpack_require__(715),
            styles: [__webpack_require__(709)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__error_service__["a" /* ErrorService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__error_service__["a" /* ErrorService */]) === 'function' && _a) || Object])
    ], ErrorComponent);
    return ErrorComponent;
    var _a;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/error.component.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__map_map_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geo_service__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__error_error_service__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MapComponent = (function () {
    function MapComponent(geo, maps, route, errSvc, router) {
        this.geo = geo;
        this.maps = maps;
        this.route = route;
        this.errSvc = errSvc;
        this.router = router;
        this.dist = "0";
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.search = params['search'];
        });
        this.waypoints = this.maps.pois;
        //if no waypoints, look up the passed coordinates
        var ar = this.search.split(";");
        var from = ar[0].split(",");
        this.map = this.maps.initMap("map");
        this.map.panTo(new L.LatLng(Number(from[1]), Number(from[0])));
        this.geo.getRoute(from[1], from[0]).subscribe(function (response) {
            _this.results = response;
            _this.dist = _this.results.dist;
            var lats = _this.results.lats;
            var markers = [];
            for (var i = 0; i < lats.length; i++) {
                var lat = lats[i].lat;
                var lng = lats[i].lng;
                markers.push(L.latLng(lat, lng));
                L.marker(L.latLng(lat, lng)).addTo(_this.map);
            }
            var turns = _this.results.turns;
            var dots = [];
            for (var i = 0; i < turns.length; i++) {
                var turn = turns[i];
                dots.push(L.latLng(turn.lat, turn.lng));
            }
            var poly = L.polygon(dots);
            var bounds = poly.getBounds();
            _this.map.fitBounds(bounds, { padding: [20, 20] });
            var line = L.polyline(dots, { color: 'red', weight: 4, smoothFactor: 0, opacity: 0.5 });
            line.addTo(_this.map);
        }, function (error) {
            console.log(error);
            _this.errSvc.recordError(error, _this.router);
        });
    };
    MapComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    MapComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-map',
            template: __webpack_require__(716),
            styles: [__webpack_require__(710)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__geo_service__["a" /* GeoService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__geo_service__["a" /* GeoService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__map_map_service__["a" /* MapService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__map_map_service__["a" /* MapService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__error_error_service__["a" /* ErrorService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__error_error_service__["a" /* ErrorService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _e) || Object])
    ], MapComponent);
    return MapComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/map.component.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geo_service__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__map_map_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__poi__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__labels__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__searchModel__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__error_error_service__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SearchComponent = (function () {
    function SearchComponent(geo, maps, errSvc, router) {
        this.geo = geo;
        this.maps = maps;
        this.errSvc = errSvc;
        this.router = router;
        this.model = new __WEBPACK_IMPORTED_MODULE_6__searchModel__["a" /* SearchModel */]();
        this.labels = new __WEBPACK_IMPORTED_MODULE_5__labels__["a" /* Label */]();
        this.dist = 0;
        this.mapID = "smap";
        this.roadLayer = "roads-new";
        this.nosecrets = true;
        this.showSearches = false;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.geo.getLabels()
            .subscribe(function (labels) {
            _this.labels = labels;
            console.log("this.labels", _this.labels);
        }, function (error) {
            _this.error = error;
            _this.errSvc.recordError(_this.error, _this.router);
        });
        this.geo.loadSearches()
            .subscribe(function (savedSearches) {
            _this.savedSearches = savedSearches;
            console.log("this.savedSearches", _this.savedSearches);
        }, function (error) {
            console.log("savedSearches", error);
        });
        this.map = this.maps.initMap("smap");
        var lat = 33.983312;
        var lng = -84.343748;
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                if (pos) {
                    lat = pos.coords.latitude;
                    lng = pos.coords.longitude;
                    console.log("Using Geolocation", lat, lng);
                    var poi = new __WEBPACK_IMPORTED_MODULE_4__poi__["a" /* Poi */]();
                    poi.name = "Current location";
                    _this.model.from = poi.name;
                    poi.lat = lat;
                    poi.lng = lng;
                    _this.confirmFrom(poi);
                }
                else {
                    console.log("Geolocation not supported");
                }
                _this.map.panTo(new L.LatLng(lat, lng));
            }, function (err) {
                this.map.panTo(new L.LatLng(lat, lng));
                console.log("Geolocation not supported", err);
            });
        }
        else {
            console.log("Geolocation not supported");
            this.map.panTo(new L.LatLng(lat, lng));
        }
    };
    SearchComponent.prototype.searchFrom = function (event) {
        if (event.keyCode == 13) {
            this.runsearchFrom();
        }
    };
    SearchComponent.prototype.clickFrom = function () {
        this.runsearchFrom();
    };
    SearchComponent.prototype.clickTo = function () {
        console.log("click to");
        this.runsearchTo();
    };
    SearchComponent.prototype.searchTo = function (event) {
        if (event.keyCode == 13) {
            console.log("searchTo kode 13");
            this.runsearchTo();
        }
    };
    SearchComponent.prototype.runsearchFrom = function () {
        var _this = this;
        if (this.model.from) {
            this.geo.lookup(this.model.from)
                .subscribe(function (pois) {
                _this.frompoints = pois;
                if (pois && pois.length == 1) {
                    _this.confirmFrom(pois[0]);
                }
            }, function (error) {
                _this.error = error;
                _this.errSvc.recordError(_this.error, _this.router);
            });
        }
    };
    SearchComponent.prototype.runsearchTo = function () {
        var _this = this;
        if (this.model.to) {
            this.geo.lookup(this.model.to)
                .subscribe(function (pois) {
                _this.topoints = pois;
                if (pois && pois.length == 1) {
                    _this.confirmTo(pois[0]);
                }
            }, function (error) {
                _this.error = error;
                _this.errSvc.recordError(_this.error, _this.router);
            });
        }
    };
    SearchComponent.prototype.confirmFrom = function (poi) {
        if (poi && poi.lat && poi.lng) {
            this.confirmedFrom = poi;
            //this.markers.addLayer(L.marker(L.latLng(this.confirmedFrom.lat, this.confirmedFrom.lng)));
            this.panTo(poi);
        }
    };
    SearchComponent.prototype.confirmTo = function (poi) {
        console.log("confirm to", poi);
        if (poi && poi.lat && poi.lng) {
            this.confirmedTo = poi;
            //L.marker(L.latLng(this.confirmedTo.lat, this.confirmedTo.lng)).addTo(this.map);
            this.panTo(poi);
            console.log("assigning the name to poi");
            poi.name = this.model.to;
            console.log("confirm to saving");
            this.geo.saveConfirmed(poi).subscribe(function (saved) {
                console.log(saved);
            }, function (error) {
                console.log(error);
            });
        }
    };
    SearchComponent.prototype.confirmSaved = function (poi) {
        if (poi && poi.lat && poi.lng) {
            this.confirmedTo = poi;
            //L.marker(L.latLng(this.confirmedTo.lat, this.confirmedTo.lng)).addTo(this.map);
            this.panTo(poi);
            this.model.to = poi.name;
        }
    };
    SearchComponent.prototype.deletePoi = function (poi) {
        var _this = this;
        this.geo.deletePoi(poi).subscribe(function (answer) {
            console.log(answer);
            for (var i = _this.savedSearches.length - 1; i >= 0; i--) {
                if (poi.id === _this.savedSearches[i].id) {
                    _this.savedSearches.splice(i, 1);
                    break;
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    SearchComponent.prototype.panTo = function (poi) {
        if (this.markers) {
            this.map.removeLayer(this.markers);
        }
        if (this.confirmedFrom && this.confirmedTo) {
            var mfrom = L.marker(L.latLng(this.confirmedFrom.lat, this.confirmedFrom.lng));
            var mTo = L.marker(L.latLng(this.confirmedTo.lat, this.confirmedTo.lng));
            this.markers = new L.LayerGroup([mfrom, mTo]);
            this.map.addLayer(this.markers);
            var dots = [];
            dots.push(L.latLng(this.confirmedFrom.lat, this.confirmedFrom.lng));
            dots.push(L.latLng(this.confirmedTo.lat, this.confirmedTo.lng));
            var poly = L.polygon(dots);
            var bounds = poly.getBounds();
            this.map.fitBounds(bounds, { padding: [20, 20] });
            //run route
            this.onSubmit();
        }
        else if (poi) {
            this.map.panTo(L.latLng(poi.lat, poi.lng));
            this.markers = new L.LayerGroup([L.marker(L.latLng(poi.lat, poi.lng))]);
            this.map.addLayer(this.markers);
        }
    };
    SearchComponent.prototype.onSubmit = function () {
        if (this.confirmedFrom && this.confirmedFrom.lat && this.confirmedFrom.lng && this.confirmedTo && this.confirmedTo.lng && this.confirmedTo.lat) {
            this.buildRoute(this.confirmedFrom, this.confirmedTo);
        }
    };
    SearchComponent.prototype.buildRoute = function (fromPoi, toPoi) {
        var _this = this;
        try {
            var from = { latlng: [fromPoi.lat, fromPoi.lng] };
            var to = { latlng: [toPoi.lat, toPoi.lng] };
            this.geo.getRoute(from, to).subscribe(function (response) {
                var routes = response;
                if (routes.length > 0) {
                    var preferred = routes[0];
                    _this.dist += preferred.dist;
                    var turns = preferred.turns;
                    var dots = [];
                    for (var i = 0; i < turns.length; i++) {
                        var turn = turns[i];
                        if (turn.lat && turn.lng) {
                            dots.push(L.latLng(turn.lat, turn.lng));
                        }
                        else if (turn.line) {
                            var arr = _this.maps.decodePolyline(turn.line);
                            for (var ii = 0; ii < arr.length; ii++) {
                                dots.push(L.latLng(arr[ii][0], arr[ii][1]));
                            }
                        }
                    }
                    _this.maps.drawLine(_this.mapID, _this.roadLayer, dots);
                }
            }, function (error) {
                console.log(error);
                _this.errSvc.recordError(error, _this.router);
            });
        }
        catch (e) {
            console.log("Issues with the routes" + e);
        }
    };
    SearchComponent.prototype.onHack = function (event) {
        if (event.keyCode == 13) {
            this.hackIt();
        }
    };
    SearchComponent.prototype.hackIt = function () {
        var _this = this;
        this.geo.hack(this.hack)
            .subscribe(function (data) {
            _this.hackAnswer = JSON.stringify(data);
            console.log("Hack Data:", _this.hackAnswer);
        }, function (error) {
            _this.error = error;
            console.log(_this.error);
            if (error.msg) {
                _this.hackAnswer = error.msg;
            }
            else {
                _this.hackAnswer = error;
            }
        });
    };
    SearchComponent.prototype.toggleSecrets = function () {
        this.nosecrets = !this.nosecrets;
    };
    SearchComponent.prototype.toggleSearches = function () {
        this.showSearches = !this.showSearches;
    };
    SearchComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'geo-search',
            template: __webpack_require__(717),
            styles: [__webpack_require__(711)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__geo_service__["a" /* GeoService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__geo_service__["a" /* GeoService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__map_map_service__["a" /* MapService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__map_map_service__["a" /* MapService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__error_error_service__["a" /* ErrorService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__error_error_service__["a" /* ErrorService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], SearchComponent);
    return SearchComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/search.component.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geo_service__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__map_map_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__error_error_service__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecretsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SecretsComponent = (function () {
    function SecretsComponent(geo, maps, errSvc, router) {
        this.geo = geo;
        this.maps = maps;
        this.errSvc = errSvc;
        this.router = router;
        this.showChart = false;
        this.cashLimit = 0;
        this.account = "";
        this.lineChartData = [
            { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: "Balance", yAxisID: "axis_balance" },
            { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: "Rate", yAxisID: "axis_rate" }];
        this.lineChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.lineChartOptions = {
            responsive: true,
            scales: {
                yAxes: [{
                        position: "left",
                        "id": "axis_balance"
                    }, {
                        position: "right",
                        "id": "axis_rate"
                    }]
            }
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(153,102,255,0.2)',
                borderColor: 'rgba(153,102,255,1)',
                pointBackgroundColor: 'rgba(153,102,255,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(153,102,255,1)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    SecretsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.geo.getAccount()
            .subscribe(function (data) {
            _this.account = data.account;
            _this.loadLimit();
            _this.loadAccountData();
        }, function (error) {
            _this.error = error;
            _this.errSvc.recordError(_this.error, _this.router);
        });
    };
    SecretsComponent.prototype.loadLimit = function () {
        var _this = this;
        this.geo.getLimit()
            .subscribe(function (data) {
            _this.cashLimit = data.limit;
            console.log("this.cashLimit", _this.cashLimit);
        }, function (error) {
            _this.error = error;
            _this.errSvc.recordError(_this.error, _this.router);
        });
    };
    SecretsComponent.prototype.loadAccountData = function () {
        var _this = this;
        this.geo.getAccountData()
            .subscribe(function (data) {
            console.log("accountdata", data);
            _this.showChart = true;
            _this.paintChart(data);
        }, function (error) {
            console.log("accountdata error", error);
            _this.showChart = false;
        });
    };
    SecretsComponent.prototype.paintChart = function (data) {
        var series = 2;
        if (data && data.length > 0) {
            var _lineChartData = new Array(series);
            var _lineChartLabels = new Array(data.length);
            _lineChartData[0] = {};
            _lineChartData[1] = {};
            _lineChartData[0].data = new Array(data.length);
            _lineChartData[0].yAxisID = "axis_balance";
            _lineChartData[0].label = "Balance";
            _lineChartData[1].data = new Array(data.length);
            _lineChartData[1].yAxisID = "axis_rate";
            _lineChartData[1].label = "Rate";
            for (var i = 0; i < data.length; i++) {
                _lineChartLabels[i] = data[i].Month;
                _lineChartData[0].data[i] = data[i].Total;
                _lineChartData[1].data[i] = data[i].Rate;
            }
            this.lineChartLabels = _lineChartLabels;
            this.lineChartData = _lineChartData;
            console.log("chart data", this.lineChartData);
            console.log("labels", this.lineChartLabels);
        }
    };
    SecretsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-secrets',
            template: __webpack_require__(718),
            styles: [__webpack_require__(712)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__geo_service__["a" /* GeoService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__geo_service__["a" /* GeoService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__map_map_service__["a" /* MapService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__map_map_service__["a" /* MapService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__error_error_service__["a" /* ErrorService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__error_error_service__["a" /* ErrorService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], SecretsComponent);
    return SecretsComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/secrets.component.js.map

/***/ }),

/***/ 467:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 467;


/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(591);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/main.js.map

/***/ }),

/***/ 589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_authguard_service__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__map_map_component__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__error_error_component__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search_component__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__secrets_secrets_component__ = __webpack_require__(318);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var routes = [
    {
        path: '',
        redirectTo: '/search',
        pathMatch: 'full'
    },
    {
        path: 'search',
        component: __WEBPACK_IMPORTED_MODULE_5__search_search_component__["a" /* SearchComponent */],
        pathMatch: 'full'
    },
    {
        path: 'secrets',
        component: __WEBPACK_IMPORTED_MODULE_6__secrets_secrets_component__["a" /* SecretsComponent */],
        pathMatch: 'full',
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_authguard_service__["a" /* AuthGuard */]]
    },
    {
        path: 'map/:search',
        component: __WEBPACK_IMPORTED_MODULE_3__map_map_component__["a" /* MapComponent */]
    },
    {
        path: 'oops',
        component: __WEBPACK_IMPORTED_MODULE_4__error_error_component__["a" /* ErrorComponent */],
        pathMatch: 'full'
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/app-routing.module.js.map

/***/ }),

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geo_service__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__error_error_service__ = __webpack_require__(64);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(titleService, geo, errSvc, router) {
        var _this = this;
        this.titleService = titleService;
        this.geo = geo;
        this.errSvc = errSvc;
        this.router = router;
        this.geo.getLabels()
            .subscribe(function (labels) {
            console.log("labels", labels);
            _this.setTitle(labels.appTitle);
        }, function (error) {
            _this.errSvc.recordError(error, _this.router);
        });
    }
    AppComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(713),
            styles: [__webpack_require__(708)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__geo_service__["a" /* GeoService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__geo_service__["a" /* GeoService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__error_error_service__["a" /* ErrorService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__error_error_service__["a" /* ErrorService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/app.component.js.map

/***/ }),

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing_module__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular_font_awesome_angular_font_awesome__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_charts__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__handler_service__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__map_map_component__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__map_map_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__geo_service__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__distance_pipe__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__auth_auth_module__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__auth_login_component__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__search_search_component__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__error_error_component__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__error_error_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__secrets_secrets_component__ = __webpack_require__(318);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_9__map_map_component__["a" /* MapComponent */],
                __WEBPACK_IMPORTED_MODULE_12__distance_pipe__["a" /* DistancePipe */],
                __WEBPACK_IMPORTED_MODULE_14__auth_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_15__search_search_component__["a" /* SearchComponent */],
                __WEBPACK_IMPORTED_MODULE_16__error_error_component__["a" /* ErrorComponent */],
                __WEBPACK_IMPORTED_MODULE_18__secrets_secrets_component__["a" /* SecretsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5_angular_font_awesome_angular_font_awesome__["a" /* AngularFontAwesomeModule */],
                __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_13__auth_auth_module__["a" /* AuthRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_6_ng2_charts__["ChartsModule"]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */], __WEBPACK_IMPORTED_MODULE_11__geo_service__["a" /* GeoService */], __WEBPACK_IMPORTED_MODULE_10__map_map_service__["a" /* MapService */], __WEBPACK_IMPORTED_MODULE_7__handler_service__["a" /* HandlerService */], __WEBPACK_IMPORTED_MODULE_17__error_error_service__["a" /* ErrorService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_12__distance_pipe__["a" /* DistancePipe */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/app.module.js.map

/***/ }),

/***/ 592:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authguard_service__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_component__ = __webpack_require__(314);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var loginRoutes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_4__login_component__["a" /* LoginComponent */] }
];
var AuthRoutingModule = (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(loginRoutes)
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__authguard_service__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/auth.module.js.map

/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Person; });
var Person = (function () {
    function Person() {
    }
    return Person;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/person.js.map

/***/ }),

/***/ 594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DistancePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DistancePipe = (function () {
    function DistancePipe() {
    }
    DistancePipe.prototype.transform = function (value, format) {
        console.log(value, format);
        if (value < 1000) {
            return value + " meters";
        }
        else {
            var div = Math.floor(value / 1000);
            var rem = Math.floor(value % 1000);
            return div + " km and " + rem + " meters";
        }
    };
    DistancePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'distance'
        }), 
        __metadata('design:paramtypes', [])
    ], DistancePipe);
    return DistancePipe;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/distance.pipe.js.map

/***/ }),

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Label; });
var Label = (function () {
    function Label() {
    }
    return Label;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/labels.js.map

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Poi; });
var Poi = (function () {
    function Poi() {
    }
    return Poi;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/poi.js.map

/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchModel; });
var SearchModel = (function () {
    function SearchModel() {
    }
    return SearchModel;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/searchModel.js.map

/***/ }),

/***/ 598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/environment.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ErrorService = (function () {
    function ErrorService() {
    }
    ErrorService.prototype.getError = function () {
        return this.errObj;
    };
    ErrorService.prototype.recordError = function (err, router) {
        this.errObj = err;
        if (router) {
            if (this.errObj.code == 401) {
                router.navigate(['/login']);
            }
            else {
                router.navigate(['/oops']);
            }
        }
    };
    ErrorService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ErrorService);
    return ErrorService;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/error.service.js.map

/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 334,
	"./af.js": 334,
	"./ar": 341,
	"./ar-dz": 335,
	"./ar-dz.js": 335,
	"./ar-kw": 336,
	"./ar-kw.js": 336,
	"./ar-ly": 337,
	"./ar-ly.js": 337,
	"./ar-ma": 338,
	"./ar-ma.js": 338,
	"./ar-sa": 339,
	"./ar-sa.js": 339,
	"./ar-tn": 340,
	"./ar-tn.js": 340,
	"./ar.js": 341,
	"./az": 342,
	"./az.js": 342,
	"./be": 343,
	"./be.js": 343,
	"./bg": 344,
	"./bg.js": 344,
	"./bn": 345,
	"./bn.js": 345,
	"./bo": 346,
	"./bo.js": 346,
	"./br": 347,
	"./br.js": 347,
	"./bs": 348,
	"./bs.js": 348,
	"./ca": 349,
	"./ca.js": 349,
	"./cs": 350,
	"./cs.js": 350,
	"./cv": 351,
	"./cv.js": 351,
	"./cy": 352,
	"./cy.js": 352,
	"./da": 353,
	"./da.js": 353,
	"./de": 356,
	"./de-at": 354,
	"./de-at.js": 354,
	"./de-ch": 355,
	"./de-ch.js": 355,
	"./de.js": 356,
	"./dv": 357,
	"./dv.js": 357,
	"./el": 358,
	"./el.js": 358,
	"./en-au": 359,
	"./en-au.js": 359,
	"./en-ca": 360,
	"./en-ca.js": 360,
	"./en-gb": 361,
	"./en-gb.js": 361,
	"./en-ie": 362,
	"./en-ie.js": 362,
	"./en-nz": 363,
	"./en-nz.js": 363,
	"./eo": 364,
	"./eo.js": 364,
	"./es": 366,
	"./es-do": 365,
	"./es-do.js": 365,
	"./es.js": 366,
	"./et": 367,
	"./et.js": 367,
	"./eu": 368,
	"./eu.js": 368,
	"./fa": 369,
	"./fa.js": 369,
	"./fi": 370,
	"./fi.js": 370,
	"./fo": 371,
	"./fo.js": 371,
	"./fr": 374,
	"./fr-ca": 372,
	"./fr-ca.js": 372,
	"./fr-ch": 373,
	"./fr-ch.js": 373,
	"./fr.js": 374,
	"./fy": 375,
	"./fy.js": 375,
	"./gd": 376,
	"./gd.js": 376,
	"./gl": 377,
	"./gl.js": 377,
	"./gom-latn": 378,
	"./gom-latn.js": 378,
	"./he": 379,
	"./he.js": 379,
	"./hi": 380,
	"./hi.js": 380,
	"./hr": 381,
	"./hr.js": 381,
	"./hu": 382,
	"./hu.js": 382,
	"./hy-am": 383,
	"./hy-am.js": 383,
	"./id": 384,
	"./id.js": 384,
	"./is": 385,
	"./is.js": 385,
	"./it": 386,
	"./it.js": 386,
	"./ja": 387,
	"./ja.js": 387,
	"./jv": 388,
	"./jv.js": 388,
	"./ka": 389,
	"./ka.js": 389,
	"./kk": 390,
	"./kk.js": 390,
	"./km": 391,
	"./km.js": 391,
	"./kn": 392,
	"./kn.js": 392,
	"./ko": 393,
	"./ko.js": 393,
	"./ky": 394,
	"./ky.js": 394,
	"./lb": 395,
	"./lb.js": 395,
	"./lo": 396,
	"./lo.js": 396,
	"./lt": 397,
	"./lt.js": 397,
	"./lv": 398,
	"./lv.js": 398,
	"./me": 399,
	"./me.js": 399,
	"./mi": 400,
	"./mi.js": 400,
	"./mk": 401,
	"./mk.js": 401,
	"./ml": 402,
	"./ml.js": 402,
	"./mr": 403,
	"./mr.js": 403,
	"./ms": 405,
	"./ms-my": 404,
	"./ms-my.js": 404,
	"./ms.js": 405,
	"./my": 406,
	"./my.js": 406,
	"./nb": 407,
	"./nb.js": 407,
	"./ne": 408,
	"./ne.js": 408,
	"./nl": 410,
	"./nl-be": 409,
	"./nl-be.js": 409,
	"./nl.js": 410,
	"./nn": 411,
	"./nn.js": 411,
	"./pa-in": 412,
	"./pa-in.js": 412,
	"./pl": 413,
	"./pl.js": 413,
	"./pt": 415,
	"./pt-br": 414,
	"./pt-br.js": 414,
	"./pt.js": 415,
	"./ro": 416,
	"./ro.js": 416,
	"./ru": 417,
	"./ru.js": 417,
	"./sd": 418,
	"./sd.js": 418,
	"./se": 419,
	"./se.js": 419,
	"./si": 420,
	"./si.js": 420,
	"./sk": 421,
	"./sk.js": 421,
	"./sl": 422,
	"./sl.js": 422,
	"./sq": 423,
	"./sq.js": 423,
	"./sr": 425,
	"./sr-cyrl": 424,
	"./sr-cyrl.js": 424,
	"./sr.js": 425,
	"./ss": 426,
	"./ss.js": 426,
	"./sv": 427,
	"./sv.js": 427,
	"./sw": 428,
	"./sw.js": 428,
	"./ta": 429,
	"./ta.js": 429,
	"./te": 430,
	"./te.js": 430,
	"./tet": 431,
	"./tet.js": 431,
	"./th": 432,
	"./th.js": 432,
	"./tl-ph": 433,
	"./tl-ph.js": 433,
	"./tlh": 434,
	"./tlh.js": 434,
	"./tr": 435,
	"./tr.js": 435,
	"./tzl": 436,
	"./tzl.js": 436,
	"./tzm": 438,
	"./tzm-latn": 437,
	"./tzm-latn.js": 437,
	"./tzm.js": 438,
	"./uk": 439,
	"./uk.js": 439,
	"./ur": 440,
	"./ur.js": 440,
	"./uz": 442,
	"./uz-latn": 441,
	"./uz-latn.js": 441,
	"./uz.js": 442,
	"./vi": 443,
	"./vi.js": 443,
	"./x-pseudo": 444,
	"./x-pseudo.js": 444,
	"./yo": 445,
	"./yo.js": 445,
	"./zh-cn": 446,
	"./zh-cn.js": 446,
	"./zh-hk": 447,
	"./zh-hk.js": 447,
	"./zh-tw": 448,
	"./zh-tw.js": 448
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 704;


/***/ }),

/***/ 708:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 709:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 710:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 711:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 712:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 713:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 714:
/***/ (function(module, exports) {

module.exports = "    <div class=\"container page-section middle-box text-center loginscreen\">\n        <form (ngSubmit)=\"login()\" #loginForm=\"ngForm\">\n            <div class=\"row\">\n              <div class=\"col-lg-6 text-center\" style=\"margin-top:30px\">\n                <h4>Your Account</h4>\n                </div>\n                <div class=\"col-lg-4\" style=\"margin:20px\">\n                <a routerLink=\"/search\"><img src=\"assets/img/branch.jpg\" height=\"50px\" width=\"50px\" alt=\"Acme Bank Logo\"></a>\n              </div>\n            </div>\n            <div class=\"form-group\" style=\"margin:top:150px;\">\n                <input type=\"email\" name=\"username\" [(ngModel)]=\"person.email\" class=\"form-control\" placeholder=\"Your Email\" required=\"\">\n            </div>\n            <div class=\"form-group\">\n                <input type=\"password\" name=\"password\" [(ngModel)]=\"person.pass\" class=\"form-control\" placeholder=\"Password\" required=\"\">\n            </div>\n            <button type=\"submit\" class=\"btn btn-primary block full-width m-b\">Sign In</button>\n            \n            <a href=\"#\"><small>Forgot password?</small></a>\n            <p class=\"text-muted text-center\"><small>Do not have an account?</small></p>\n            <a class=\"btn btn-sm btn-white btn-block\" ng-click='navTo(\"register\")'>Create an account</a>\n            <p class=\"text-info\">{{message}}</p>\n        </form>\n        <p class=\"m-t\"> <small>Acme Bank &copy; 2017</small> </p>\n    </div>"

/***/ }),

/***/ 715:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\t<div class=\"row\">\n\t\t<div class=\"col-lg-4 col-lg-offset-1\">\n\t\t\t<h2>We have issues</h2>\n\t\t</div>\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"col-lg-10 col-lg-offset-1\">\n\t\t\t<p>{{errObj.msg}}</p>\n\t\t\t<p>response code: {{errObj.code}}</p>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ 716:
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container\">\n\t<div class=\"row\">\n\t\t<div class=\"col-lg-9 col-offset-lg-1\">\n\t\t\t<h2>Route on Kubernetes</h2>\n\t\t\t<div style=\"width:100%   ;height:300px\" id=\"map\"></div>\n\t\t\t\t<p>The distance is {{ dist | distance }}</p>\n\t\t</div>\n\t</div>\n\t<div class=\"row\" *ngFor=\"let wp of waypoints;\">\n\t\t<div class=\"col-lg-2 col-offset-lg-1\">\n\t\t\t<h3>{{wp.name}}</h3>\n\t\t\t<p>{{wp.address}}</p>\n\t\t</div>\n\t</div>\n</div>\n\n\n\n\n\n\n \n"

/***/ }),

/***/ 717:
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar navbar-inverse\">\n\t<div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a href=\"https://apprenda.com\" class=\"navbar-left\"><img height=\"50px\" width=\"50px\" src=\"assets/img/apprenda-logo.png\" alt=\"Apprenda Logo\"></a>\n          <a class=\"navbar-brand\" routerLink=\"/search\">Public Banking. Branch Locator</a>\n     </div>\n     <div id=\"navbar\" class=\"collapse navbar-collapse\">\n          <ul class=\"nav navbar-nav\">\n            <!-- <li class=\"active\"><a router-link=\"/\">Home</a></li> -->\n          </ul>\n          <ul class=\"nav navbar-top-links navbar-right\">\n                <li><a aria-expanded=\"false\" role=\"button\" routerLink=\"/secrets\">My Account</a></li>\n           </ul>\n     </div>\n</div>\n<div class=\"container\">\n\t<div class=\"row\">\n\t  <div class=\"col-lg-3 col-lg-offset-1\" style=\"margin:auto;height:50px\">\n\t  \t<p>Acme Bank</p>\n\t    <a routerLink=\"/search\"><img src=\"assets/img/branch.jpg\" height=\"50px\" width=\"50px\" alt=\"Acme Bank Logo\"></a>\n\t  </div>\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"col-lg-4 col-lg-offset-1\">\n\t\t\t<h2>Locate your branch</h2>\n\t\t\t<div style=\"border:solid 1px gray; padding:10px\">\n\t\t\t<form (keydown)=\"searchFrom($event)\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label>From</label>\n\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<input type=\"text\" placeholder=\"Your location\"  class=\"form-control\" id=\"from\"\n\t         [(ngModel)]=\"model.from\" name=\"from\">\n\t         \t<span class=\"input-group-btn\">\n        \t\t\t\t<button class=\"btn btn-secondary\" type=\"button\" (click)=\"clickFrom()\">...</button>\n      \t\t\t\t</span>\n      \t\t\t </div>\n\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t\t<div *ngIf=\"frompoints && frompoints.length > 1\" style=\"color:#080;margin:10px\">Click on the desired venue to put it on the map</div>\n\t\t\t\t<div style=\"cursor:pointer\" *ngFor=\"let poi of frompoints;\">\n\t\t\t\t\t  <p (click)=\"confirmFrom(poi)\">{{poi.address}}</p>\n\t\t\t\t</div>\n\t\t\t\t<form (keydown)=\"searchTo($event)\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label>To</label>\n\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<input type=\"text\" placeholder=\"{{labels.placeholder}}\"  class=\"form-control\" id=\"to\"\n\t         [(ngModel)]=\"model.to\" name=\"to\">\n\t         \t\t<span class=\"input-group-btn\">\n        \t\t\t\t<button class=\"btn btn-secondary\" type=\"button\" (click)=\"clickTo()\">...</button>\n      \t\t\t\t</span>\n      \t\t\t </div>\n\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t\t<div style=\"margin:15px\">\n\t\t\t\t\t<button (click)=\"onSubmit()\">Route...\t</button>\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf=\"topoints && topoints.length > 1\" style=\"color:#080;margin:10px\">Click on the desired venue to put it on the map</div>\n\t\t\t\t<div style=\"cursor:pointer\" *ngFor=\"let poi of topoints;\">\n\t\t\t\t\t  <p (click)=\"confirmTo(poi)\">{{poi.address}}</p>\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf=\"savedSearches && savedSearches.length > 0\" style=\"margin-top:20px;border:solid 1px gray; padding:10px;\">\n\t\t\t\t\t<div (click)=\"toggleSearches()\" style=\"cursor:pointer; color:#080;margin:10px\">Previous searches</div>\n\t\t\t\t\t<div *ngIf=\"showSearches\">\n\t\t\t\t\t\t<div class=\"row\" style=\"cursor:pointer\" *ngFor=\"let poi of savedSearches;\">\n\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t  <p (click)=\"confirmSaved(poi)\">{{poi.name}}, {{poi.address}}</p>\n\t\t\t\t\t\t\t </div>\n\t\t\t\t\t\t\t <div class=\"col-sm-1\">\n\t\t\t\t\t\t\t  <button (click)=\"deletePoi(poi)\" class=\"text-warning\">x</button>\n\t\t\t\t\t\t\t </div>\n\t\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\t\n\t\t</div>\n\t\t<div class=\"col-lg-7\">\n\t\t\t<div *ngIf=\"dist\" style=\"margin:10px\">Distance: {{dist | distance}}</div>\n\t\t\t<div style=\"margin-top:10px;width:100%;height:300px; border:solid 1px gray;\" id=\"smap\"></div>\n\t\t</div>\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"col-lg-4 col-lg-offset-2 form-group\">\n\t\t\t<div class=\"panel\" style=\"margin-top:30px\">\n\t\t\t\t<div class=\"panel-header\">\n\t\t\t\t\t<button (click)=\"toggleSecrets()\"><i class=\"fa fa-lock\"></i></button>\n\t\t\t\t</div>\n\t\t\t\t<div [hidden]=\"nosecrets\" class=\"panel-body\">\n\t\t\t\t\t<form (keydown)=\"onHack($event)\">\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<label>Get Secure Data</label>\n\t\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"http://url\"  class=\"form-control\" id=\"hack\"\n\t\t\t\t         [(ngModel)]=\"hack\" name=\"to\">\n\t\t\t\t         \t\t<span class=\"input-group-btn\">\n\t\t\t\t    \t\t\t\t<button class=\"btn btn-secondary\" type=\"button\" (click)=\"hackIt()\">Submit</button>\n\t\t\t\t  \t\t\t\t</span>\n\t\t\t\t  \t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t\t<div>{{hackAnswer}}</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ 718:
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar navbar-inverse\">\n\t<div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a href=\"https://apprenda.com\" class=\"navbar-left\"><img height=\"50px\" width=\"50px\" src=\"assets/img/apprenda-logo.png\" alt=\"Apprenda Logo\"></a>\n          <a class=\"navbar-brand\" routerLink=\"/search\">Secure Banking</a>\n     </div>\n     <div id=\"navbar\" class=\"collapse navbar-collapse\">\n          <ul class=\"nav navbar-nav\">\n            <!-- <li class=\"active\"><a router-link=\"/\">Home</a></li> -->\n          </ul>\n     </div>\n</div>\n<div class=\"container\">\n<!-- \t<div class=\"row\">\n\t  <div class=\"col-lg-3 col-lg-offset-1\" style=\"margin:auto;height:50px\">\n\t    <a href=\"https://kubernetes.io\"><img src=\"assets/img/kubernetes-logo.png\" height=\"50px\" width=\"50px\" alt=\"Kubernetes Logo\"></a>\n\t  </div>\n\t</div> -->\n\t<div class=\"row\">\n\t\t<div class=\"col-lg-2 col-lg-offset-1\">\n\t\t\t<h3>Acme Branch</h3>\n\t\t\t<img src=\"assets/img/branch.jpg\" height=\"150px\" width=\"150px\" alt=\"Acme Bank\">\n\t  \t</div>\n\t\t<div class=\"col-lg-4\">\n\t\t\t<p style=\"margin-top:50px\">Your Current Balance:</p>\n\t\t\t<h3>{{cashLimit | currency}}</h3>\n\t\t\t<p>Account number: {{account}}</p>\n\t\t</div>\n\t</div>\n\t<div class=\"row\" *ngIf=\"showChart\">\n\t\t<h4 style=\"margin-top:50px;text-align:center\">Annual Interest Forecast</h4>\n\t\t<div col-lg-8 col-lg-offset-2>\n\t\t    <div style=\"display: block;\">\n\t\t    <canvas baseChart width=\"500\" height=\"200\"\n\t\t                [datasets]=\"lineChartData\"\n\t\t                [labels]=\"lineChartLabels\"\n\t\t                [options]=\"lineChartOptions\"\n\t\t                [colors]=\"lineChartColors\"\n\t\t                [legend]=\"lineChartLegend\"\n\t\t                [chartType]=\"lineChartType\"\n\t\t                (chartHover)=\"chartHovered($event)\"\n\t\t                (chartClick)=\"chartClicked($event)\"></canvas>\n\t\t    </div>\n\t  \t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(468);


/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__handler_service__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(726);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GeoService = (function () {
    function GeoService(http, auth, handler) {
        this.http = http;
        this.auth = auth;
        this.handler = handler;
        this.url = "/api/";
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
    }
    GeoService.prototype.getLabels = function () {
        this.addAuthHeader();
        return this.http.get(this.url + "labels", { headers: this.headers })
            .map(this.extractData)
            .catch(this.handler.handleError);
    };
    GeoService.prototype.hack = function (path) {
        var obj = {};
        obj.path = path;
        this.addAuthHeader();
        return this.http.post(this.url + "hack", obj, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handler.handleError);
    };
    GeoService.prototype.getLimit = function () {
        this.addAuthHeader();
        return this.http.get(this.url + "cashlimit", { headers: this.headers })
            .map(this.extractData)
            .catch(this.handler.handleError);
    };
    GeoService.prototype.getAccount = function () {
        this.addAuthHeader();
        return this.http.get(this.url + "account", { headers: this.headers })
            .map(this.extractData)
            .catch(this.handler.handleError);
    };
    GeoService.prototype.getAccountData = function () {
        this.addAuthHeader();
        return this.http.get(this.url + "accountdata", { headers: this.headers })
            .map(this.extractData)
            .catch(this.handler.handleError);
    };
    GeoService.prototype.getRoute = function (from, to, via, mode) {
        if (via === void 0) { via = null; }
        if (mode === void 0) { mode = null; }
        this.addAuthHeader();
        var body = {};
        body.from = from;
        body.to = to;
        body.via = via;
        body.mode = mode;
        return this.http.post(this.url + "route", body, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handler.handleError);
    };
    GeoService.prototype.saveConfirmed = function (poi) {
        this.addAuthHeader();
        var body = {};
        body.poi = poi;
        return this.http.post(this.url + "savePoi", body, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handler.handleError);
    };
    GeoService.prototype.deletePoi = function (poi) {
        this.addAuthHeader();
        var body = {};
        body.poi = poi;
        return this.http.post(this.url + "deletePoi", body, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handler.handleError);
    };
    GeoService.prototype.lookup = function (search) {
        this.addAuthHeader();
        return this.http.post(this.url + "lookup", { "place": search }, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handler.handleError);
    };
    GeoService.prototype.loadSearches = function () {
        this.addAuthHeader();
        return this.http.get(this.url + "loadSearches", { headers: this.headers })
            .map(this.extractData)
            .catch(this.handler.handleError);
    };
    GeoService.prototype.addAuthHeader = function () {
        if (this.auth.token && !this.headers.has('Authorization')) {
            this.headers.append('Authorization', this.auth.token);
        }
    };
    GeoService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    GeoService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__handler_service__["a" /* HandlerService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__handler_service__["a" /* HandlerService */]) === 'function' && _c) || Object])
    ], GeoService);
    return GeoService;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/ajeltuhin/dev/kubernetes/labexpress/geoapp/app/trip/src/geo.service.js.map

/***/ })

},[756]);
//# sourceMappingURL=main.bundle.map