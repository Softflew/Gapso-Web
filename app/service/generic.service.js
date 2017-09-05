"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var User_1 = require('../model/User');
var Business_1 = require('../model/Business');
var Station_1 = require('../model/Station');
var PortalUserRole_1 = require('../model/PortalUserRole');
var DispensingPointAttendant_1 = require('../model/DispensingPointAttendant');
require('rxjs/add/operator/toPromise');
require('rxjs/Rx');
var Rx_1 = require('rxjs/Rx');
var GenericService = (function () {
    function GenericService(http, router) {
        this.http = http;
        this.router = router;
        // URL to web api
        this.baseURL = 'http://localhost:8080/Gapso-web/service/generic/';
        this.businessManager = 'Business Manager';
        this.portalUser = new User_1.User();
        this.role = new PortalUserRole_1.PortalUserRole();
        this.business = new Business_1.Business();
        this.station = new Station_1.Station();
        this.dispAttendant = new DispensingPointAttendant_1.DispensingPointAttendant();
        this.sendNewUserEmailURL = this.baseURL + 'sendNewUserEmail';
        this.loginURL = this.baseURL + 'login?';
        this.validateLoginEmailURL = this.baseURL + 'validateLoginEmail?';
        this.checkBusinessManagerValidityURL = this.baseURL + 'checkBusinessManagerValidity?';
        this.checkAttendantValidityURL = this.baseURL + 'checkAttendantValidity?';
        this.checkStationManagerValidityURL = this.baseURL + 'checkStationManagerValidity?';
    }
    GenericService.prototype.jwt = function () {
        // create authorization header with jwt token
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return new http_1.RequestOptions({ headers: headers });
    };
    GenericService.prototype.sendNewUserEmail = function (user) {
        return this.http
            .post(this.sendNewUserEmailURL, JSON.stringify(user), this.jwt())
            .map(function (response) { return response.json(); });
    };
    GenericService.prototype.login = function (emailAddress, password) {
        var url = this.loginURL + "emailAddress=" + emailAddress + "&password=" + password;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    GenericService.prototype.validateLoginEmail = function (emailAddress) {
        var url = this.validateLoginEmailURL + "emailAddress=" + emailAddress;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    GenericService.prototype.continiousUserValidityCheck = function () {
        var _this = this;
        this.portalUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (this.portalUser != null) {
            this.role = JSON.parse(sessionStorage.getItem('role'));
            if (this.role.designation == 'BUSINESSMANAGER') {
                this.business = JSON.parse(sessionStorage.getItem('business'));
                var url_1 = this.checkBusinessManagerValidityURL + "userid=" + this.portalUser.id + "&businessId=" + this.business.id;
                Rx_1.Observable.interval(5000)
                    .switchMap(function () { return _this.http.get(url_1); })
                    .map(function (data) { return data.json(); })
                    .subscribe(function (data) {
                    if (data == 'FALSE') {
                        _this.logout();
                        _this.router.navigate(['login']);
                    }
                });
            }
            if (this.role.designation == 'ATTENDANT') {
                this.dispAttendant = JSON.parse(sessionStorage.getItem('dispensingPointAttendant'));
                var url_2 = this.checkAttendantValidityURL + "userid=" + this.portalUser.id + "&dispAttendantId=" + this.dispAttendant.id + "&roleId=" + this.role.id;
                Rx_1.Observable.interval(5000)
                    .switchMap(function () { return _this.http.get(url_2); })
                    .map(function (data) { return data.json(); })
                    .subscribe(function (data) {
                    if (data == 'FALSE') {
                        _this.logout();
                        _this.router.navigate(['login']);
                    }
                });
            }
            if (this.role.designation == 'STATIONMANAGER') {
                this.station = JSON.parse(sessionStorage.getItem('station'));
                var url_3 = this.checkStationManagerValidityURL + "userid=" + this.portalUser.id + "&stationId=" + this.station.id + "&roleId=" + this.role.id;
                Rx_1.Observable.interval(5000)
                    .switchMap(function () { return _this.http.get(url_3); })
                    .map(function (data) { return data.json(); })
                    .subscribe(function (data) {
                    if (data == 'FALSE') {
                        _this.logout();
                        _this.router.navigate(['login']);
                    }
                });
            }
        }
    };
    GenericService.prototype.logout = function () {
        sessionStorage.clear();
    };
    GenericService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], GenericService);
    return GenericService;
}());
exports.GenericService = GenericService;
//# sourceMappingURL=generic.service.js.map