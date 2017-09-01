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
var PortalUserRole_1 = require('../model/PortalUserRole');
var user_service_1 = require('../service/user.service');
var alert_service_1 = require('../service/alert.service');
var BusinessApprovalComponent = (function () {
    function BusinessApprovalComponent(userService, alertService, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.elementRef = elementRef;
        this.user = new User_1.User();
        this.role = new PortalUserRole_1.PortalUserRole();
    }
    BusinessApprovalComponent.prototype.ngOnInit = function () {
        this.getAllBusiness();
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.role = JSON.parse(sessionStorage.getItem('role'));
    };
    BusinessApprovalComponent.prototype.getAllBusiness = function () {
        var _this = this;
        this.userService.getAllBusiness().subscribe(function (data) {
            _this.businesses = data;
        }, function (error) {
            console.log(error);
        });
    };
    BusinessApprovalComponent.prototype.approveBusiness = function (id) {
        var _this = this;
        if (confirm("Are you sure you want to approve this Business") == true) {
            this.userService.approveBusiness(id).subscribe(function (data) {
                _this.getAllBusiness();
            }, function (error) {
                console.log(error);
            });
        }
    };
    BusinessApprovalComponent.prototype.declineBusiness = function (id) {
        var _this = this;
        if (confirm("Are you sure you want to decline this Business") == true) {
            this.userService.declineBusiness(id).subscribe(function (data) {
                _this.getAllBusiness();
            }, function (error) {
                console.log(error);
            });
        }
    };
    BusinessApprovalComponent.prototype.activateBusiness = function (id) {
        var _this = this;
        if (confirm("Are you sure you want to activate this Business") == true) {
            this.userService.activateBusiness(id).subscribe(function (data) {
                _this.getAllBusiness();
            }, function (error) {
                console.log(error);
            });
        }
    };
    BusinessApprovalComponent.prototype.deactivateBusiness = function (id) {
        var _this = this;
        if (confirm("Are you sure you want to de-activate this Business") == true) {
            this.userService.deactivateBusiness(id).subscribe(function (data) {
                _this.getAllBusiness();
            }, function (error) {
                console.log(error);
            });
        }
    };
    BusinessApprovalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'businessapproval',
            templateUrl: 'businessapproval.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, core_1.ElementRef])
    ], BusinessApprovalComponent);
    return BusinessApprovalComponent;
}());
exports.BusinessApprovalComponent = BusinessApprovalComponent;
//# sourceMappingURL=businessapproval.component.js.map