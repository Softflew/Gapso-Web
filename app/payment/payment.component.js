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
var PaymentOption_1 = require('../model/PaymentOption');
var user_service_1 = require('../service/user.service');
var alert_service_1 = require('../service/alert.service');
var PaymentComponent = (function () {
    function PaymentComponent(userService, alertService, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.elementRef = elementRef;
        this.user = new User_1.User();
        this.portalUser = new User_1.User();
        this.business = new Business_1.Business();
        this.paymentoption = new PaymentOption_1.PaymentOption();
        this.editPaymentOption = new PaymentOption_1.PaymentOption();
    }
    PaymentComponent.prototype.ngOnInit = function () {
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
        this.business = JSON.parse(sessionStorage.getItem('business'));
        this.getAllBusinessPaymentOption();
    };
    PaymentComponent.prototype.createPaymentOption = function () {
        var _this = this;
        if (this.paymentoption.name == null || this.paymentoption.name == "") {
        }
        else {
            this.paymentoption.setBusiness(this.business);
            this.userService.createPaymentOption(this.paymentoption).subscribe(function (data) {
                _this.alertService.success('PaymentOption Created Successfully', false);
                _this.paymentoption = new PaymentOption_1.PaymentOption();
                _this.getAllBusinessPaymentOption();
            }, function (error) {
                console.log(error);
                _this.alertService.error("PaymentOption Creation Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
    };
    PaymentComponent.prototype.updatePaymentOption = function () {
        var _this = this;
        if (this.editPaymentOption.name == null || this.editPaymentOption.name == "") {
        }
        else {
            this.userService.updatePaymentOption(this.editPaymentOption).subscribe(function (data) {
                _this.alertService.success('Payment Option Updated Successfully', true);
                _this.getAllBusinessPaymentOption();
            }, function (error) {
                console.log(error);
                _this.alertService.error("Payment Option Update Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
    };
    PaymentComponent.prototype.openPaymentOptionEdit = function (currentPaymentOption) {
        this.editPaymentOption = currentPaymentOption;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalAnchor");
        modalAnchor.click();
    };
    PaymentComponent.prototype.getAllBusinessPaymentOption = function () {
        var _this = this;
        this.userService.getBusinessPaymentOption(this.business.id).subscribe(function (data) {
            _this.paymentoptions = data;
        }, function (error) {
            console.log(error);
        });
    };
    PaymentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'payment',
            templateUrl: 'payment.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, core_1.ElementRef])
    ], PaymentComponent);
    return PaymentComponent;
}());
exports.PaymentComponent = PaymentComponent;
//# sourceMappingURL=payment.component.js.map