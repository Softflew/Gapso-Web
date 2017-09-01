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
var Station_1 = require('../model/Station');
var AttendantMgtComponent = (function () {
    function AttendantMgtComponent(userService, alertService, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.elementRef = elementRef;
        this.user = new User_1.User();
        this.station = new Station_1.Station();
        this.attendant = new User_1.User();
    }
    AttendantMgtComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.station = JSON.parse(sessionStorage.getItem('station'));
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
        this.getAllStationPortalUsers();
    };
    AttendantMgtComponent.prototype.getAllStationPortalUsers = function () {
        var _this = this;
        this.userService.getStationStaff(this.station.id).subscribe(function (data) {
            _this.attendants = data;
        }, function (error) {
            console.log(error);
        });
    };
    AttendantMgtComponent.prototype.activateAttendant = function (user) {
        var _this = this;
        if (confirm("Are you sure you want to activate this Attendant") == true) {
            this.userService.activateUser(user.id).subscribe(function (data) {
                _this.getAllStationPortalUsers();
            }, function (error) {
                console.log(error);
                _this.alertService.error("Attendant Activation Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
        else {
        }
    };
    AttendantMgtComponent.prototype.deactivateAttendant = function (user) {
        var _this = this;
        if (confirm("Are you sure you want to de-activate this Attendant") == true) {
            this.userService.deactivateUser(user.id).subscribe(function (data) {
                _this.getAllStationPortalUsers();
            }, function (error) {
                console.log(error);
                _this.alertService.error("Attendant De-Activation Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
        else {
        }
    };
    AttendantMgtComponent.prototype.openAttendantDetail = function (user) {
        this.attendant = user;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalAttendant");
        modalAnchor.click();
    };
    AttendantMgtComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'attendantmgt',
            templateUrl: 'attendantmgt.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, core_1.ElementRef])
    ], AttendantMgtComponent);
    return AttendantMgtComponent;
}());
exports.AttendantMgtComponent = AttendantMgtComponent;
//# sourceMappingURL=attendantmgt.component.js.map