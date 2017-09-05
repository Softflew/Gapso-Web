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
var PortalUserRole_1 = require('../model/PortalUserRole');
var alert_service_1 = require('../service/alert.service');
var create_service_1 = require('../service/create.service');
var delete_service_1 = require('../service/delete.service');
var generic_service_1 = require('../service/generic.service');
var RegisterComponent = (function () {
    function RegisterComponent(alertService, createService, deleteService, genericService, router, elementRef) {
        this.alertService = alertService;
        this.createService = createService;
        this.deleteService = deleteService;
        this.genericService = genericService;
        this.router = router;
        this.elementRef = elementRef;
        this.genders = [];
        this.submitted = false;
        this.user = new User_1.User();
        this.business = new Business_1.Business();
        this.portalUserRole = new PortalUserRole_1.PortalUserRole();
    }
    RegisterComponent.prototype.registerUser = function () {
        var _this = this;
        if (this.user.firstName == null || this.user.surname == null || this.user.emailAddress == null
            || this.user.phoneNumber == null || this.business.name == null || this.submitted == false) {
        }
        else {
            this.createService.createUser(this.user).subscribe(function (user) {
                _this.business.owner = user;
                user.designation = _this.genericService.businessManager;
                _this.createService.createBusiness(_this.business).subscribe(function (business) {
                    _this.portalUserRole.business = business;
                    _this.portalUserRole.portalUser = user;
                    _this.createService.createPortalUserRole(_this.portalUserRole).subscribe(function (portalUserRole) {
                        _this.genericService.sendNewUserEmail(user).subscribe(function (data) {
                            sessionStorage.setItem('currentUser', JSON.stringify(user));
                            sessionStorage.setItem('role', JSON.stringify(portalUserRole));
                            _this.alertService.success("Your Registration was Successful. \n\
                                            Registration Approval Notice will be sent to your email by the Administrator shortly. \n\
                                            Thank You!!!");
                            _this.newUser();
                        }, function (error) {
                            _this.deleteService.deletePortalUserRole(portalUserRole).subscribe();
                            _this.deleteService.deleteBusiness(business).subscribe();
                            _this.deleteService.deleteUser(user).subscribe();
                            console.log(error);
                            _this.alertService.error("Registration Unsuccessful. Please Try Again or Contact Administrator");
                            _this.submitted = false;
                        });
                    }, function (error) {
                        console.log(error);
                        _this.deleteService.deleteBusiness(business).subscribe();
                        _this.deleteService.deleteUser(user).subscribe();
                        _this.alertService.error("Registration Unsuccessful. Please Try Again or Contact Administrator");
                        _this.submitted = false;
                    });
                }, function (error) {
                    console.log(error);
                    _this.deleteService.deleteUser(user).subscribe();
                    _this.alertService.error("Registration Unsuccessful. Please Try Again or Contact Administrator");
                    _this.submitted = false;
                });
            }, function (error) {
                console.log(error);
                _this.alertService.error("Registration Unsuccessful. Please Try Again or Contact Administrator");
                _this.submitted = false;
            });
        }
    };
    RegisterComponent.prototype.ngOnInit = function () {
        this.newUser();
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
    };
    RegisterComponent.prototype.newUser = function () {
        this.user = new User_1.User();
        this.business = new Business_1.Business();
        this.portalUserRole = new PortalUserRole_1.PortalUserRole();
        this.submitted = false;
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register',
            templateUrl: 'register.component.html'
        }), 
        __metadata('design:paramtypes', [alert_service_1.AlertService, create_service_1.CreateService, delete_service_1.DeleteService, generic_service_1.GenericService, router_1.Router, core_1.ElementRef])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map