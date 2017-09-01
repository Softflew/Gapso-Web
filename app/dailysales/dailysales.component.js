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
var ProductDispensingPoint_1 = require('../model/ProductDispensingPoint');
var DispensingPointAttendant_1 = require('../model/DispensingPointAttendant');
var Product_1 = require('../model/Product');
var StationProduct_1 = require('../model/StationProduct');
var Station_1 = require('../model/Station');
var StationProductPrice_1 = require('../model/StationProductPrice');
var DailySales_1 = require('../model/DailySales');
var user_service_1 = require('../service/user.service');
var alert_service_1 = require('../service/alert.service');
var Rx_1 = require('rxjs/Rx');
var DailySalesComponent = (function () {
    function DailySalesComponent(userService, alertService, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.elementRef = elementRef;
        this.user = new User_1.User();
        this.pdp = new ProductDispensingPoint_1.ProductDispensingPoint();
        this.dpa = new DispensingPointAttendant_1.DispensingPointAttendant();
        this.product = new Product_1.Product();
        this.station = new Station_1.Station();
        this.stationProduct = new StationProduct_1.StationProduct();
        this.stationProductPrice = new StationProductPrice_1.StationProductPrice();
        this.stationPaymentOptions = [];
        this.todaySales = [];
        this.today = Date.now();
    }
    DailySalesComponent.prototype.checkProductAvailability = function (currentSale) {
        if ((this.currentProductLevel - currentSale) <= 0) {
            return false;
        }
        return true;
    };
    DailySalesComponent.prototype.realTimeProductLevel = function () {
        var _this = this;
        var url = this.userService.getCurrentProductLevelURL + "stationProductId=" + this.stationProduct.id;
        Rx_1.Observable.interval(1000)
            .switchMap(function () { return _this.userService.http.get(url); })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.currentProductLevel = data;
        });
    };
    DailySalesComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.pdp = JSON.parse(sessionStorage.getItem('dispensingPoint'));
        this.dpa = JSON.parse(sessionStorage.getItem('dispensingPointAttendant'));
        if (this.pdp != null) {
            this.product = this.pdp.product;
            this.station = this.pdp.station;
            this.getStationProduct();
            this.getStationPaymentOptions();
        }
        if (this.dpa != null) {
            this.getTodaySales();
        }
    };
    DailySalesComponent.prototype.getStationPaymentOptions = function () {
        var _this = this;
        this.userService.getStationPaymentOption(this.station.id).subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var u = data_1[_i];
                if (u.active == true) {
                    _this.stationPaymentOptions.push(u);
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    DailySalesComponent.prototype.getTodaySales = function () {
        var _this = this;
        this.userService.getTodaySaleQuantity(this.dpa.id).subscribe(function (data) {
            _this.todaySalesQuantity = data;
        }, function (error) {
            console.log(error);
        });
        this.userService.getTodaySaleAmount(this.dpa.id).subscribe(function (data) {
            _this.todaySalesAmount = data;
        }, function (error) {
            console.log(error);
        });
        this.userService.getTodaySale(this.dpa.id).subscribe(function (data) {
            _this.todaySales = data;
        }, function (error) {
            console.log(error);
        });
    };
    DailySalesComponent.prototype.getStationProduct = function () {
        var _this = this;
        this.userService.getStationProductByStationAndProduct(this.station.id, this.product.id).subscribe(function (data) {
            _this.stationProduct = new StationProduct_1.StationProduct();
            _this.stationProduct = data;
            _this.realTimeProductLevel();
            _this.userService.getActiveStationProductMinLevel(_this.stationProduct.id).subscribe(function (data) {
                if (data != null) {
                    _this.stationProduct.currentMinLevel = data.mininumLevel;
                }
            }, function (error) {
                console.log(error);
            });
            _this.userService.getActiveStationProductPrice(_this.stationProduct.id).subscribe(function (data) {
                _this.stationProductPrice = data;
                if (data != null) {
                    _this.stationProduct.currentPrice = data.price;
                }
            }, function (error) {
                console.log(error);
            });
            //                this.userService.getCurrentProductLevel(this.stationProduct.id).subscribe(
            //                    data => {
            //                        this.currentProductLevel = data;
            //                    },
            //                    error => {
            //                        console.log(error);
            //                    });
        }, function (error) {
            console.log(error);
        });
    };
    DailySalesComponent.prototype.recordSales = function () {
        var _this = this;
        var dailySales = new DailySales_1.DailySales();
        dailySales.stationProductPrice = this.stationProductPrice;
        dailySales.dispensingPointAttendant = this.dpa;
        if (this.salesUnit != null) {
            dailySales.quantity = this.salesUnit;
        }
        if (this.salesAmount != null) {
            dailySales.quantity = (this.salesAmount / this.stationProductPrice.price);
        }
        if (this.checkProductAvailability(dailySales.quantity)) {
            dailySales.paymentOptionId = this.paymentOptionId;
            this.userService.recordSales(dailySales).subscribe(function (data) {
                _this.paymentOptionId = null;
                _this.salesUnit = null;
                _this.salesAmount = null;
                _this.getTodaySales();
                _this.getStationProduct();
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.alertService.error("There is isn't enough product to sell");
        }
    };
    DailySalesComponent.prototype.saleType = function (saletype) {
        if (saletype == 'amount') {
            var unit = document.getElementById("unit");
            unit.hidden = true;
            var unitInput = document.getElementById("unitInput");
            unitInput.setAttribute('disabled', 'disabled');
            var amount = document.getElementById("amount");
            amount.hidden = false;
            var amountInput = document.getElementById("amountInput");
            amountInput.removeAttribute('disabled');
            this.salesUnit = null;
        }
        if (saletype == 'unit') {
            var amount = document.getElementById("amount");
            amount.hidden = true;
            var amountInput = document.getElementById("amountInput");
            amountInput.setAttribute('disabled', 'disabled');
            var unit = document.getElementById("unit");
            unit.hidden = false;
            var unitInput = document.getElementById("unitInput");
            unitInput.removeAttribute('disabled');
            this.salesAmount = null;
        }
    };
    DailySalesComponent.prototype.openSales = function () {
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalSales");
        modalAnchor.click();
    };
    DailySalesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dailysales',
            templateUrl: 'dailysales.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, core_1.ElementRef])
    ], DailySalesComponent);
    return DailySalesComponent;
}());
exports.DailySalesComponent = DailySalesComponent;
//# sourceMappingURL=dailysales.component.js.map