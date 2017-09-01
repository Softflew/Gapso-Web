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
var HeaderComponent = (function () {
    function HeaderComponent(userService, router, elementRef) {
        this.userService = userService;
        this.router = router;
        this.elementRef = elementRef;
        this.user = new User_1.User();
        this.business = new Business_1.Business();
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.business = JSON.parse(sessionStorage.getItem('business'));
        if (this.business != null) {
            this.getBusinessLogo();
        }
    };
    HeaderComponent.prototype.logout = function () {
        this.userService.logout();
        this.router.navigate(['login']);
    };
    HeaderComponent.prototype.getBusinessLogo = function () {
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
            var img = _this.elementRef.nativeElement.querySelector("#logo");
            img.src = blobUrl;
        }, function (error) {
            console.log(error);
        });
    };
    HeaderComponent.prototype.navigationManager = function () {
        sessionStorage.removeItem('currentURL');
    };
    HeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'heada',
            templateUrl: 'header.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router, core_1.ElementRef])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map