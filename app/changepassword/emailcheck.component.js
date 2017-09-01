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
var EmailCheckComponent = (function () {
    function EmailCheckComponent(userService, alertService) {
        this.userService = userService;
        this.alertService = alertService;
        this.user = new User_1.User();
    }
    EmailCheckComponent.prototype.ngOnInit = function () {
        this.newUser();
    };
    EmailCheckComponent.prototype.validateEmail = function () {
        var _this = this;
        this.userService.validateEmail(this.user.emailAddress).subscribe(function (data) {
            _this.newUser();
            _this.alertService.success("A new password has been sent to your email.  Please check");
        }, function (error) {
            console.log(error);
            _this.alertService.error("Email address is not valid");
        });
    };
    EmailCheckComponent.prototype.endChangePassword = function () {
        sessionStorage.removeItem("changePassword");
    };
    EmailCheckComponent.prototype.newUser = function () {
        this.user = new User_1.User();
    };
    EmailCheckComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'emailcheck',
            templateUrl: 'emailcheck.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService])
    ], EmailCheckComponent);
    return EmailCheckComponent;
}());
exports.EmailCheckComponent = EmailCheckComponent;
//# sourceMappingURL=emailcheck.component.js.map