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
var RegisterComponent = (function () {
    function RegisterComponent(userService, alertService, router, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.router = router;
        this.elementRef = elementRef;
        this.genders = [];
        this.submitted = false;
        this.user = new User_1.User();
        this.business = new Business_1.Business();
    }
    RegisterComponent.prototype.registerUser = function () {
        var _this = this;
        if (this.user.firstName == null || this.user.surname == null || this.user.emailAddress == null
            || this.user.phoneNumber == null || this.user.password == null || this.user.middleName == null
            || this.submitted == false) {
        }
        else {
            this.userService.createUser(this.user)
                .subscribe(function (data) {
                sessionStorage.setItem('currentUser', JSON.stringify(data));
                sessionStorage.setItem('role', JSON.stringify(data));
                _this.alertService.success("Your Registration was Successful. \n\
                                            Registration Approval Notice will be sent to your email by the Administrator shortly. \n\
                                            Thank You!!!");
                _this.newUser();
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
        this.submitted = false;
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register',
            templateUrl: 'register.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, router_1.Router, core_1.ElementRef])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map