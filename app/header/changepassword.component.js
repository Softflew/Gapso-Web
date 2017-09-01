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
var user_service_1 = require('../service/user.service');
var alert_service_1 = require('../service/alert.service');
var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(userService, alertService, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.elementRef = elementRef;
        this.user = new User_1.User();
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
    };
    ChangePasswordComponent.prototype.changePassword = function () {
        var _this = this;
        if (this.oldpassword == null || this.oldpassword == "" ||
            this.newpassword == null || this.newpassword == "" ||
            this.retrypassword == null || this.retrypassword == "") {
        }
        else if (this.retrypassword != this.newpassword) {
            this.alertService.error("New Password and Confirm Password does not match!!!!");
        }
        else {
            this.userService.login(this.user.emailAddress, this.oldpassword).subscribe(function (data) {
                _this.userService.changePassword(_this.user.id, _this.newpassword).subscribe(function (data) {
                    _this.alertService.success("Password changed successfully");
                }, function (error) {
                    console.log(error);
                    _this.alertService.error("Password change was unsuccessful. Please try again or contact admin.");
                });
            }, function (error) {
                console.log(error);
                _this.alertService.error("Password is incorrect!!!!");
            });
        }
    };
    ChangePasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'changepassword',
            templateUrl: 'changepassword.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, core_1.ElementRef])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=changepassword.component.js.map