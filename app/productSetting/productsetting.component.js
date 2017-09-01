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
var Station_1 = require('../model/Station');
var user_service_1 = require('../service/user.service');
var alert_service_1 = require('../service/alert.service');
var ProductSettingComponent = (function () {
    function ProductSettingComponent(userService, alertService, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.elementRef = elementRef;
        this.user = new User_1.User();
        this.station = new Station_1.Station();
        this.stationProduct = new StationProduct_1.StationProduct();
    }
    ProductSettingComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.station = JSON.parse(sessionStorage.getItem('station'));
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
        this.getAllStationProduct();
    };
    ProductSettingComponent.prototype.getAllStationProduct = function () {
        var _this = this;
        this.stationProducts = [];
        this.activeStationProducts = [];
        this.userService.getStationProduct(this.station.id).subscribe(function (data) {
            _this.stationProducts = data;
            var _loop_1 = function(u) {
                if (u.active == true) {
                    u.currentPrice = 0.0;
                    u.currentMinLevel = 0.0;
                    _this.userService.getActiveStationProductPrice(u.id).subscribe(function (data) {
                        if (data != null) {
                            u.currentPrice = data.price;
                        }
                    }, function (error) {
                        console.log(error);
                    });
                    _this.userService.getActiveStationProductMinLevel(u.id).subscribe(function (data) {
                        if (data != null) {
                            u.currentMinLevel = data.mininumLevel;
                        }
                    }, function (error) {
                        console.log(error);
                    });
                    _this.activeStationProducts.push(u);
                }
            };
            for (var _i = 0, _a = _this.stationProducts; _i < _a.length; _i++) {
                var u = _a[_i];
                _loop_1(u);
            }
        }, function (error) {
            console.log(error);
        });
    };
    ProductSettingComponent.prototype.openPriceManager = function (stationProduct) {
        this.stationProduct = stationProduct;
        this.currentProductName = stationProduct.product.name;
        this.currentProductCode = stationProduct.product.productCode;
        this.currentProductPrice = stationProduct.currentPrice;
        this.newProductPrice = null;
        this.previousProductPrice = null;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalPriceManager");
        modalAnchor.click();
    };
    ProductSettingComponent.prototype.openMinLevelManager = function (stationProduct) {
        this.stationProduct = stationProduct;
        this.currentProductName = stationProduct.product.name;
        this.currentProductCode = stationProduct.product.productCode;
        this.currentProductMinLevel = stationProduct.currentMinLevel;
        this.currentProductUnit = stationProduct.product.unit;
        this.newProductMinLevel = null;
        this.previousProductMinLevel = null;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalMinLevelManager");
        modalAnchor.click();
    };
    ProductSettingComponent.prototype.openProductLevelManager = function (stationProduct) {
        var _this = this;
        this.stationProduct = stationProduct;
        this.currentProductName = stationProduct.product.name;
        this.currentProductCode = stationProduct.product.productCode;
        this.currentProductLevel = stationProduct.currentLevel;
        this.currentProductUnit = stationProduct.product.unit;
        this.newProductSupply = null;
        this.previousProductLevel = null;
        this.userService.getCurrentProductLevel(this.stationProduct.id).subscribe(function (data) {
            _this.currentProductLevel = data;
        }, function (error) {
            console.log(error);
            _this.alertService.error("Please Try Again or Contact Administrator");
        });
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalLevelManager");
        modalAnchor.click();
    };
    ProductSettingComponent.prototype.updatePrice = function () {
        var _this = this;
        if (confirm("Are you sure you want to change the price of this product?") == true) {
            if (this.newProductPrice != null) {
                this.userService.updateProductPrice(this.stationProduct.id, this.newProductPrice).subscribe(function (data) {
                    _this.previousProductPrice = _this.currentProductPrice;
                    _this.currentProductPrice = data.price;
                    _this.newProductPrice = 0;
                    _this.alertService.success('Product Price Updated Successfully', true);
                    _this.getAllStationProduct();
                }, function (error) {
                    console.log(error);
                    _this.alertService.error("Product Price Update Unsuccessful. Please Try Again or Contact Administrator");
                });
            }
        }
    };
    ProductSettingComponent.prototype.updateMinLevel = function () {
        var _this = this;
        if (confirm("Are you sure you want to change the critical minimum level of this product?") == true) {
            if (this.newProductMinLevel != null) {
                this.userService.updateProductMinLevel(this.stationProduct.id, this.newProductMinLevel).subscribe(function (data) {
                    _this.previousProductMinLevel = _this.currentProductMinLevel;
                    _this.currentProductMinLevel = data.mininumLevel;
                    _this.newProductMinLevel = 0;
                    _this.alertService.success('Product Critical Minimum Level Updated Successfully', true);
                    _this.getAllStationProduct();
                }, function (error) {
                    console.log(error);
                    _this.alertService.error("Product Critical Minimum Level Update Unsuccessful. Please Try Again or Contact Administrator");
                });
            }
        }
    };
    ProductSettingComponent.prototype.updateProductLevel = function () {
        var _this = this;
        if (confirm("Are you sure you want to record a fresh product supply?") == true) {
            if (this.newProductSupply != null) {
                this.userService.updateProductLevel(this.stationProduct.id, this.newProductSupply).subscribe(function (data) {
                    _this.previousProductLevel = _this.currentProductLevel;
                    _this.currentProductLevel = data.newLevel;
                    _this.newProductSupply = 0;
                    _this.alertService.success('Product New Supply Updated Successfully', true);
                    _this.getAllStationProduct();
                }, function (error) {
                    console.log(error);
                    _this.alertService.error("Product New Supply Update Unsuccessful. Please Try Again or Contact Administrator");
                });
            }
        }
    };
    ProductSettingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'productsetting',
            templateUrl: 'productsetting.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, core_1.ElementRef])
    ], ProductSettingComponent);
    return ProductSettingComponent;
}());
exports.ProductSettingComponent = ProductSettingComponent;
//# sourceMappingURL=productsetting.component.js.map