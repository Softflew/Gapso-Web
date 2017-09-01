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
var Business_1 = require('../model/Business');
var Product_1 = require('../model/Product');
var user_service_1 = require('../service/user.service');
var alert_service_1 = require('../service/alert.service');
var ProductComponent = (function () {
    function ProductComponent(userService, alertService, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.elementRef = elementRef;
        this.user = new User_1.User();
        this.portalUser = new User_1.User();
        this.business = new Business_1.Business();
        this.product = new Product_1.Product();
        this.editProduct = new Product_1.Product();
    }
    ProductComponent.prototype.ngOnInit = function () {
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
        this.business = JSON.parse(sessionStorage.getItem('business'));
        this.getAllBusinessProduct();
    };
    ProductComponent.prototype.createProduct = function () {
        var _this = this;
        if (this.product.name == null || this.product.name == "" ||
            this.product.productCode == null || this.product.productCode == "" ||
            this.product.unit == null || this.product.unit == "") {
        }
        else {
            this.product.setBusiness(this.business);
            this.userService.createProduct(this.product).subscribe(function (data) {
                _this.alertService.success('Product Created Successfully', false);
                _this.product = new Product_1.Product();
                _this.getAllBusinessProduct();
            }, function (error) {
                console.log(error);
                _this.alertService.error("Product Creation Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
    };
    ProductComponent.prototype.updateProduct = function () {
        var _this = this;
        if (this.editProduct.name == null || this.editProduct.name == "" ||
            this.editProduct.productCode == null || this.editProduct.productCode == "" ||
            this.editProduct.unit == null || this.editProduct.unit == "") {
        }
        else {
            this.userService.updateProduct(this.editProduct).subscribe(function (data) {
                _this.alertService.success('Product Updated Successfully', true);
                _this.getAllBusinessProduct();
                //                    var modal = this.elementRef.nativeElement.querySelector("#modal-dialog").querySelector("#closeModal");
                //                    modal.click();
            }, function (error) {
                console.log(error);
                _this.alertService.error("Product Update Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
    };
    ProductComponent.prototype.openEdit = function (currentProduct) {
        this.editProduct = currentProduct;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalAnchor");
        modalAnchor.click();
    };
    ProductComponent.prototype.getAllBusinessProduct = function () {
        var _this = this;
        this.userService.getBusinessProduct(this.business.id).subscribe(function (data) {
            _this.products = data;
        }, function (error) {
            console.log(error);
        });
    };
    ProductComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'product',
            templateUrl: 'product.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, core_1.ElementRef])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map