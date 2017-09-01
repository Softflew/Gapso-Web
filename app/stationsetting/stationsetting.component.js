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
var StationProduct_1 = require('../model/StationProduct');
var ProductDispensingPoint_1 = require('../model/ProductDispensingPoint');
var Station_1 = require('../model/Station');
var user_service_1 = require('../service/user.service');
var alert_service_1 = require('../service/alert.service');
var StationSettingComponent = (function () {
    function StationSettingComponent(userService, alertService, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.elementRef = elementRef;
        this.user = new User_1.User();
        this.station = new Station_1.Station();
        this.stationProduct = new StationProduct_1.StationProduct();
        this.pdp = new ProductDispensingPoint_1.ProductDispensingPoint();
        this.editPdp = new ProductDispensingPoint_1.ProductDispensingPoint();
        this.checkedBusinessPaymentOptions = [];
        this.checkedStationPaymentOptions = [];
    }
    StationSettingComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.station = JSON.parse(sessionStorage.getItem('station'));
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
        this.getAllStationProduct();
        this.getDispensingPointByStation();
        this.filterStationAttendants();
        this.getAllStationPaymentOption();
    };
    StationSettingComponent.prototype.getDispensingPointByStation = function () {
        var _this = this;
        this.pdps = [];
        this.userService.getDispensingPointByStation(this.station.id).subscribe(function (data) {
            var _loop_1 = function(u) {
                _this.userService.getActiveDispensingPointAttendant(u.id).subscribe(function (data) {
                    if (data != null) {
                        u.currentAttendant = data.firstName + " " + data.surname;
                    }
                }, function (error) {
                    console.log(error);
                });
                _this.pdps.push(u);
            };
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var u = data_1[_i];
                _loop_1(u);
            }
        }, function (error) {
            console.log(error);
        });
    };
    StationSettingComponent.prototype.getAllStationProduct = function () {
        var _this = this;
        this.stationProducts = [];
        this.activeProducts = [];
        this.userService.getStationProduct(this.station.id).subscribe(function (data) {
            _this.stationProducts = data;
            for (var _i = 0, _a = _this.stationProducts; _i < _a.length; _i++) {
                var u = _a[_i];
                if (u.active == true) {
                    _this.activeProducts.push(u.product);
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    StationSettingComponent.prototype.filterStationAttendants = function () {
        var _this = this;
        this.attendants = [];
        this.userService.filterStationAttendants(this.station.id).subscribe(function (data) {
            _this.attendants = data;
        }, function (error) {
            console.log(error);
        });
    };
    StationSettingComponent.prototype.createDispensingPoint = function () {
        var _this = this;
        if (this.productId != null && this.pdp.name != "") {
            for (var _i = 0, _a = this.activeProducts; _i < _a.length; _i++) {
                var u = _a[_i];
                if (this.productId == u.id) {
                    this.pdp.product = u;
                    break;
                }
            }
            this.pdp.station = this.station;
            this.userService.createProductDispensingPoint(this.pdp).subscribe(function (data) {
                if (_this.attendantId != null && _this.attendantId > 0) {
                    _this.userService.createDispensingPointAttendant(_this.attendantId, data.id).subscribe(function (data) {
                    }, function (error) {
                        console.log(error);
                        _this.alertService.error("Product Dispensing Point Creation Unsuccessful. Please Try Again or Contact Administrator");
                    });
                }
                _this.alertService.success('Product Dispensing Point Created Successfully', true);
                _this.pdp = new ProductDispensingPoint_1.ProductDispensingPoint();
                _this.productId = 0;
                _this.attendantId = 0;
                _this.getDispensingPointByStation();
                _this.filterStationAttendants();
            }, function (error) {
                console.log(error);
                _this.alertService.error("Product Dispensing Point Creation Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
        else {
        }
    };
    StationSettingComponent.prototype.updateDispensingPoint = function () {
        var _this = this;
        for (var _i = 0, _a = this.activeProducts; _i < _a.length; _i++) {
            var u = _a[_i];
            if (this.editProductId == u.id) {
                this.editPdp.product = u;
                break;
            }
        }
        this.userService.updateProductDispensingPoint(this.editPdp).subscribe(function (data) {
            if (_this.editAttendantId == 0 || _this.editAttendantId > 0) {
                _this.userService.updateProductDispensingPointAttendant(_this.editAttendantId, data.id).subscribe(function (data) {
                    _this.userService.getActiveDispensingPointAttendant(_this.editPdp.id).subscribe(function (data) {
                        _this.filterStationAttendants();
                        _this.getDispensingPointByStation();
                        _this.editPdp.currentAttendant = "";
                        if (data != null) {
                            _this.editPdp.currentAttendant = data.firstName + " " + data.surname;
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }, function (error) {
                    console.log(error);
                    _this.alertService.error("Product Dispensing Point Update Unsuccessful. Please Try Again or Contact Administrator");
                });
            }
            _this.alertService.success('Product Dispensing Point Updated Successfully', true);
            _this.getDispensingPointByStation();
            _this.filterStationAttendants();
        }, function (error) {
            console.log(error);
            _this.alertService.error("Product Dispensing Point Update Unsuccessful. Please Try Again or Contact Administrator");
        });
    };
    StationSettingComponent.prototype.resetDispensePointAttendant = function () {
        var _this = this;
        if (confirm("Are you sure you want to remove all the Attendant(s) attached to all the Dispensing Point(s) of this station?") == true) {
            this.userService.resetDispensingPointAttendants(this.station.id).subscribe(function (data) {
                _this.alertService.success('Operation was Successfully', true);
                _this.getDispensingPointByStation();
                _this.filterStationAttendants();
            }, function (error) {
                console.log(error);
                _this.alertService.error("Product Dispensing Point Update Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
        else {
        }
    };
    StationSettingComponent.prototype.getAllStationPaymentOption = function () {
        var _this = this;
        this.checkedBusinessPaymentOptions = [];
        this.checkedStationPaymentOptions = [];
        this.stationPaymentOptions = [];
        this.activeStationPaymentOptions = [];
        this.inactivePaymentOptions = [];
        this.userService.getStationPaymentOption(this.station.id).subscribe(function (data) {
            _this.stationPaymentOptions = data;
            for (var _i = 0, _a = _this.stationPaymentOptions; _i < _a.length; _i++) {
                var u = _a[_i];
                if (u.active == true) {
                    _this.activeStationPaymentOptions.push(u);
                }
                else {
                    _this.inactivePaymentOptions.push(u);
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    StationSettingComponent.prototype.businessPaymentOptionOnClick = function (id, e) {
        if (e.target.checked) {
            this.checkedBusinessPaymentOptions.push(id);
        }
        if (!e.target.checked) {
            for (var _i = 0, _a = this.checkedBusinessPaymentOptions; _i < _a.length; _i++) {
                var bp = _a[_i];
                if (id == bp) {
                    var index = this.checkedBusinessPaymentOptions.indexOf(bp);
                    if (index !== -1) {
                        this.checkedBusinessPaymentOptions.splice(index, 1);
                    }
                }
            }
        }
    };
    StationSettingComponent.prototype.stationPaymentOptionOnClick = function (id, e) {
        if (e.target.checked) {
            this.checkedStationPaymentOptions.push(id);
        }
        if (!e.target.checked) {
            for (var _i = 0, _a = this.checkedStationPaymentOptions; _i < _a.length; _i++) {
                var bp = _a[_i];
                if (id == bp) {
                    var index = this.checkedStationPaymentOptions.indexOf(bp);
                    if (index !== -1) {
                        this.checkedStationPaymentOptions.splice(index, 1);
                    }
                }
            }
        }
    };
    StationSettingComponent.prototype.addStationPaymentOption = function () {
        var _this = this;
        this.userService.createStationPaymentOption(this.checkedBusinessPaymentOptions).subscribe(function (data) {
            _this.getAllStationPaymentOption();
        }, function (error) {
            console.log(error);
        });
    };
    StationSettingComponent.prototype.removeStationPaymentOption = function () {
        var _this = this;
        this.userService.removeStationPaymentOption(this.checkedStationPaymentOptions).subscribe(function (data) {
            _this.getAllStationPaymentOption();
        }, function (error) {
            console.log(error);
        });
    };
    StationSettingComponent.prototype.activateDispensingPoint = function (pdp) {
        var _this = this;
        if (confirm("Are you sure you want to activate this Product Dispensing Point") == true) {
            this.userService.activateProductDispensingPoint(pdp.id).subscribe(function (data) {
                _this.getDispensingPointByStation();
            }, function (error) {
                console.log(error);
                _this.alertService.error("Product Dispensing Point Activation Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
    };
    StationSettingComponent.prototype.deactivateDispensingPoint = function (pdp) {
        var _this = this;
        if (confirm("Are you sure you want to de-activate this Product Dispensing Point") == true) {
            this.userService.deactivateProductDispensingPoint(pdp.id).subscribe(function (data) {
                _this.getDispensingPointByStation();
            }, function (error) {
                console.log(error);
                _this.alertService.error("Product Dispensing Point De-Activation Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
    };
    StationSettingComponent.prototype.openDispensePoint = function (pdp) {
        this.filterStationAttendants();
        this.editPdp = pdp;
        this.editProductId = pdp.product.id;
        this.editAttendantId = -1;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalDispensePoint");
        modalAnchor.click();
    };
    StationSettingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'stationsetting',
            templateUrl: 'stationsetting.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, core_1.ElementRef])
    ], StationSettingComponent);
    return StationSettingComponent;
}());
exports.StationSettingComponent = StationSettingComponent;
//# sourceMappingURL=stationsetting.component.js.map