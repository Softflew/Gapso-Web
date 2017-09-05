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
var router_1 = require('@angular/router');
var User_1 = require('../model/User');
var Business_1 = require('../model/Business');
var user_service_1 = require('../service/user.service');
var alert_service_1 = require('../service/alert.service');
var BusinessComponent = (function () {
    function BusinessComponent(userService, alertService, router, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.router = router;
        this.elementRef = elementRef;
        this.user = new User_1.User();
        this.business = new Business_1.Business();
    }
    BusinessComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.business = JSON.parse(sessionStorage.getItem('business'));
        this.getBusinessLogo();
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
    };
    BusinessComponent.prototype.updateBusiness = function () {
        var _this = this;
        if (this.business.name == null || this.business.name == "") {
        }
        else {
            this.userService.updateBusiness(this.business).subscribe(function (data) {
                _this.alertService.success('Business Updated Successfully', true);
                sessionStorage.setItem('business', JSON.stringify(data));
                _this.router.navigate(['business']);
            }, function (error) {
                console.log(error);
                _this.alertService.error("Business Update Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
    };
    BusinessComponent.prototype.imageUploaded = function (e) {
        var modal = this.elementRef.nativeElement.querySelector("#modal-dialog").querySelector("#closeModal");
        modal.click();
        location.reload();
    };
    BusinessComponent.prototype.disableSendButton = function (e) {
    };
    BusinessComponent.prototype.imageRemoved = function (e) {
    };
    BusinessComponent.prototype.getBusinessLogo = function () {
        var _this = this;
        this.userService.getBusinessLogo(this.business.id).subscribe(function (data) {
            var byteCharacters = atob(data);
            var byteArrays = [];
            for (var offset = 0; offset < byteCharacters.length; offset += 512) {
                var slice = byteCharacters.slice(offset, offset + 512);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            var blob = new Blob(byteArrays, { type: 'image/png' });
            var blobUrl = URL.createObjectURL(blob);
            var img = _this.elementRef.nativeElement.querySelector("#logo2");
            img.src = blobUrl;
        }, function (error) {
            console.log(error);
        });
    };
    BusinessComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'business',
            templateUrl: 'business.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, router_1.Router, core_1.ElementRef])
    ], BusinessComponent);
    return BusinessComponent;
}());
exports.BusinessComponent = BusinessComponent;
//# sourceMappingURL=business.component.js.map