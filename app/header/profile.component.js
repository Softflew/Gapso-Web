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
var PortalUserRole_1 = require('../model/PortalUserRole');
var ProfileComponent = (function () {
    function ProfileComponent(userService, alertService, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.elementRef = elementRef;
        this.user = new User_1.User();
        this.role = new PortalUserRole_1.PortalUserRole();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.role = JSON.parse(sessionStorage.getItem('role'));
        if (this.role.designation == 'BUSINESSMANAGER') {
            this.designation = 'Business Manager';
        }
    };
    ProfileComponent.prototype.updateUser = function () {
        var _this = this;
        if (this.user.firstName == null || this.user.firstName == "" ||
            this.user.surname == null || this.user.surname == "" ||
            this.user.emailAddress == null || this.user.emailAddress == "") {
        }
        else {
            this.userService.updatePortalUser(this.user).subscribe(function (data) {
                _this.alertService.success('User Updated Successfully', false);
                sessionStorage.setItem('currentUser', JSON.stringify(data));
                var modal = _this.elementRef.nativeElement.querySelector("#modal-dialog").querySelector("#closeModal");
                modal.click();
            }, function (error) {
                console.log(error);
                _this.alertService.error("Profile Update Unsuccessful. Please Try Again or Contact Administrator");
                _this.user = JSON.parse(sessionStorage.getItem('currentUser'));
                var modal = _this.elementRef.nativeElement.querySelector("#modal-dialog").querySelector("#closeModal");
                modal.click();
            });
        }
    };
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'profile',
            templateUrl: 'profile.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, core_1.ElementRef])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map