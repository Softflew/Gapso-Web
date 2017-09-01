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
var User_1 = require('../model/User');
var PortalUserRole_1 = require('../model/PortalUserRole');
var Business_1 = require('../model/Business');
var Station_1 = require('../model/Station');
var user_service_1 = require('../service/user.service');
var alert_service_1 = require('../service/alert.service');
var StationComponent = (function () {
    function StationComponent(userService, alertService, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.elementRef = elementRef;
        this.user = new User_1.User();
        this.role = new PortalUserRole_1.PortalUserRole();
        this.stationManager = new User_1.User();
        this.stationAttendants = [];
        this.checkedBusinessProducts = [];
        this.checkedStationProducts = [];
        this.business = new Business_1.Business();
        this.station = new Station_1.Station();
        this.editStation = new Station_1.Station();
    }
    StationComponent.prototype.ngOnInit = function () {
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
        var s2 = document.createElement("script");
        s2.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBZ7KCRuw5zamWrxs9YNg8a1odheU2FSbo&libraries=places';
        s2.type = 'text/javascript';
        this.elementRef.nativeElement.appendChild(s2);
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.role = JSON.parse(sessionStorage.getItem('role'));
        this.business = JSON.parse(sessionStorage.getItem('business'));
        this.getAllBusinessStations();
    };
    StationComponent.prototype.createStation = function () {
        var _this = this;
        if (this.station.name == null || this.station.name == "") {
        }
        else {
            this.station.setBusiness(this.business);
            this.userService.createStation(this.station).subscribe(function (data) {
                _this.alertService.success('Station Created Successfully', false);
                _this.station = new Station_1.Station();
                _this.getAllBusinessStations();
            }, function (error) {
                console.log(error);
                _this.alertService.error("Station Creation Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
    };
    StationComponent.prototype.updateStation = function () {
        var _this = this;
        if (this.editStation.name == null || this.editStation.name == "") {
        }
        else {
            this.userService.updateStation(this.editStation).subscribe(function (data) {
                _this.alertService.success('Station Updated Successfully', false);
                _this.getAllBusinessStations();
                //                    var modal = this.elementRef.nativeElement.querySelector("#modal-dialog").querySelector("#closeModal");
                //                    modal.click();
            }, function (error) {
                console.log(error);
                _this.alertService.error("Station Update Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
    };
    StationComponent.prototype.getAllBusinessStations = function () {
        var _this = this;
        this.userService.getBusinessStation(this.business.id).subscribe(function (data) {
            _this.stations = data;
        }, function (error) {
            console.log(error);
        });
    };
    StationComponent.prototype.getAllStationProduct = function (station) {
        var _this = this;
        this.checkedBusinessProducts = [];
        this.checkedStationProducts = [];
        this.stationProducts = [];
        this.activeStationProducts = [];
        this.inactiveStationProducts = [];
        this.userService.getStationProduct(station.id).subscribe(function (data) {
            _this.stationProducts = data;
            for (var _i = 0, _a = _this.stationProducts; _i < _a.length; _i++) {
                var u = _a[_i];
                if (u.active == true) {
                    _this.activeStationProducts.push(u);
                }
                else {
                    _this.inactiveStationProducts.push(u);
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    StationComponent.prototype.getAddress = function (e) {
        console.log(e);
        console.log(e.country);
    };
    StationComponent.prototype.openEdit = function (station) {
        this.editStation = station;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalAnchor");
        modalAnchor.click();
    };
    StationComponent.prototype.openStaff = function (station) {
        this.editStation = station;
        this.stationManager = new User_1.User;
        this.stationAttendants = [];
        this.getAllBusinessPortalUsers();
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalStaff");
        modalAnchor.click();
    };
    StationComponent.prototype.openProduct = function (station) {
        this.editStation = station;
        this.getAllStationProduct(this.editStation);
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalProduct");
        modalAnchor.click();
    };
    StationComponent.prototype.businessProductOnClick = function (id, e) {
        if (e.target.checked) {
            this.checkedBusinessProducts.push(id);
        }
        if (!e.target.checked) {
            for (var _i = 0, _a = this.checkedBusinessProducts; _i < _a.length; _i++) {
                var bp = _a[_i];
                if (id == bp) {
                    var index = this.checkedBusinessProducts.indexOf(bp);
                    if (index !== -1) {
                        this.checkedBusinessProducts.splice(index, 1);
                    }
                }
            }
        }
    };
    StationComponent.prototype.stationProductOnClick = function (id, e) {
        if (e.target.checked) {
            this.checkedStationProducts.push(id);
        }
        if (!e.target.checked) {
            for (var _i = 0, _a = this.checkedStationProducts; _i < _a.length; _i++) {
                var bp = _a[_i];
                if (id == bp) {
                    var index = this.checkedStationProducts.indexOf(bp);
                    if (index !== -1) {
                        this.checkedStationProducts.splice(index, 1);
                    }
                }
            }
        }
    };
    StationComponent.prototype.addStationProduct = function () {
        var _this = this;
        this.userService.createStationProduct(this.checkedBusinessProducts).subscribe(function (data) {
            _this.getAllStationProduct(_this.editStation);
        }, function (error) {
            console.log(error);
        });
    };
    StationComponent.prototype.removeStationProduct = function () {
        var _this = this;
        this.userService.removeStationProduct(this.checkedStationProducts).subscribe(function (data) {
            _this.getAllStationProduct(_this.editStation);
        }, function (error) {
            console.log(error);
        });
    };
    StationComponent.prototype.getAllBusinessPortalUsers = function () {
        var _this = this;
        this.userService.getBusinessStaff(this.business.id).subscribe(function (data) {
            var _loop_1 = function(u) {
                _this.userService.getUserRole(u.id).subscribe(function (udata) {
                    if (udata.station != null) {
                        if (udata.station.id == _this.editStation.id) {
                            if (udata.designation == "ATTENDANT") {
                                _this.stationAttendants.push(u);
                            }
                            if (udata.designation == "STATIONMANAGER") {
                                _this.stationManager = u;
                            }
                        }
                    }
                }, function (error) {
                    console.log(error);
                });
            };
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var u = data_1[_i];
                _loop_1(u);
            }
        }, function (error) {
            console.log(error);
        });
    };
    StationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'station',
            templateUrl: 'station.component.html',
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, core_1.ElementRef])
    ], StationComponent);
    return StationComponent;
}());
exports.StationComponent = StationComponent;
//# sourceMappingURL=station.component.js.map