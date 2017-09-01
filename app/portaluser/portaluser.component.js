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
var user_service_1 = require('../service/user.service');
var alert_service_1 = require('../service/alert.service');
var PortalUserComponent = (function () {
    function PortalUserComponent(userService, alertService, elementRef) {
        this.userService = userService;
        this.alertService = alertService;
        this.elementRef = elementRef;
        this.user = new User_1.User();
        this.portalUser = new User_1.User();
        this.business = new Business_1.Business();
        this.portalUsers = [];
        this.designations = [];
    }
    PortalUserComponent.prototype.ngOnInit = function () {
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.business = JSON.parse(sessionStorage.getItem('business'));
        this.getAllBusinessPortalUsers();
        this.getAllBusinessStations();
        this.loadDesignation();
        this.portalUser = new User_1.User();
    };
    PortalUserComponent.prototype.createUser = function () {
        var _this = this;
        if (this.portalUser.firstName == null || this.portalUser.firstName == "" ||
            this.portalUser.surname == null || this.portalUser.surname == "" ||
            this.portalUser.emailAddress == null || this.portalUser.emailAddress == "" ||
            this.stationId == null ||
            this.designation == null || this.designation == "") {
        }
        else {
            this.portalUser.setStationId(this.stationId);
            this.portalUser.setDesignation(this.designation);
            this.portalUser.setBusinessId(this.business.id);
            if (this.designation == 'Station Manager') {
                this.userService.stationManagerCheck(this.stationId).subscribe(function (data) {
                    if (JSON.stringify(data) == 'true') {
                        _this.alertService.error("The selected station already has a manager.");
                    }
                    else {
                        _this.userService.createPortalUser(_this.portalUser).subscribe(function (data) {
                            _this.alertService.success('User Created Successfully', false);
                            _this.portalUser = new User_1.User();
                            _this.designation = null;
                            _this.stationId = null;
                            _this.getAllBusinessPortalUsers();
                        }, function (error) {
                            console.log(error);
                            _this.alertService.error("User Creation Unsuccessful. Please Try Again or Contact Administrator");
                        });
                    }
                }, function (error) {
                    console.log(error);
                    _this.alertService.error("User Creation Unsuccessful. Please Try Again or Contact Administrator");
                });
            }
            else {
                this.userService.createPortalUser(this.portalUser).subscribe(function (data) {
                    _this.alertService.success('User Created Successfully', false);
                    _this.portalUser = new User_1.User();
                    _this.designation = null;
                    _this.stationId = null;
                    _this.getAllBusinessPortalUsers();
                }, function (error) {
                    console.log(error);
                    _this.alertService.error("User Creation Unsuccessful. Please Try Again or Contact Administrator");
                });
            }
        }
    };
    PortalUserComponent.prototype.updateRole = function () {
        var _this = this;
        this.portalUser.stationId = this.stationId;
        this.portalUser.designation = this.designation;
        this.portalUser.businessId = this.business.id;
        this.userService.updatePortalUserRole(this.portalUser).subscribe(function (data) {
            _this.alertService.success('User Role Updated Successfully', false);
            _this.portalUser = new User_1.User();
            _this.getAllBusinessPortalUsers();
        }, function (error) {
            console.log(error);
            _this.alertService.error("User Role Update Unsuccessful. Please Try Again or Contact Administrator");
        });
    };
    PortalUserComponent.prototype.updateUserRole = function () {
        var _this = this;
        if (this.portalUser.designation == this.designation && this.portalUser.stationId == this.stationId) {
        }
        else {
            if (this.designation == 'Station Manager') {
                this.userService.stationManagerCheck(this.stationId).subscribe(function (data) {
                    if (JSON.stringify(data) == 'true') {
                        _this.alertService.error("The selected station already has a manager. De-activate the existing manager and proceed");
                    }
                    else {
                        _this.updateRole();
                    }
                }, function (error) {
                    console.log(error);
                    _this.alertService.error("User Role Update Unsuccessful. Please Try Again or Contact Administrator");
                });
            }
            else {
                this.updateRole();
            }
        }
    };
    PortalUserComponent.prototype.updateUser = function () {
        var _this = this;
        if (this.portalUser.firstName == null || this.portalUser.firstName == "" ||
            this.portalUser.surname == null || this.portalUser.surname == "" ||
            this.portalUser.emailAddress == null || this.portalUser.emailAddress == "") {
        }
        else {
            if (this.portalUser.designation == this.designation && this.portalUser.stationId == this.stationId) {
                this.userService.updatePortalUser(this.portalUser).subscribe(function (data) {
                    _this.alertService.success('User Updated Successfully', false);
                    _this.portalUser = new User_1.User();
                    _this.getAllBusinessPortalUsers();
                    //                        var modal = this.elementRef.nativeElement.querySelector("#modal-dialog").querySelector("#closeModal");
                    //                        modal.click();
                }, function (error) {
                    console.log(error);
                    _this.alertService.error("User Update Unsuccessful. Please Try Again or Contact Administrator");
                });
            }
        }
    };
    PortalUserComponent.prototype.openEdit = function (currentUser) {
        this.resetAlert();
        this.portalUser = currentUser;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalAnchor");
        modalAnchor.click();
    };
    PortalUserComponent.prototype.openEditUserRole = function (currentUser) {
        this.resetAlert();
        this.portalUser = currentUser;
        if (currentUser.designation != null) {
            this.designation = currentUser.designation;
        }
        if (currentUser.stationId != null) {
            this.stationId = currentUser.stationId;
        }
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalUserRole");
        modalAnchor.click();
    };
    PortalUserComponent.prototype.getAllBusinessPortalUsers = function () {
        var _this = this;
        this.userService.getBusinessStaff(this.business.id).subscribe(function (data) {
            var _loop_1 = function(u) {
                _this.userService.getUserRole(u.id).subscribe(function (udata) {
                    if (udata.station != null) {
                        u.stationId = udata.station.id;
                    }
                    if (udata.designation == "STATIONMANAGER") {
                        u.designation = 'Station Manager';
                        _this.portalUsers.push(u);
                    }
                    if (udata.designation == "ATTENDANT") {
                        u.designation = 'Attendant';
                        _this.portalUsers.push(u);
                    }
                }, function (error) {
                    console.log(error);
                });
            };
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var u = data_1[_i];
                _loop_1(u);
            }
        }, function (error) {
            console.log(error);
        });
    };
    PortalUserComponent.prototype.resetAlert = function () {
        this.alertService.reset(false);
        this.portalUser = new User_1.User();
        this.designation = null;
        this.stationId = null;
    };
    PortalUserComponent.prototype.getAllBusinessStations = function () {
        var _this = this;
        this.userService.getActiveBusinessStation(this.business.id).subscribe(function (data) {
            if (data)
                _this.stations = data;
        }, function (error) {
            console.log(error);
        });
    };
    PortalUserComponent.prototype.loadDesignation = function () {
        this.designations.push('Attendant');
        this.designations.push('Station Manager');
    };
    PortalUserComponent.prototype.activateUser = function (user) {
        var _this = this;
        if (confirm("Are you sure you want to activate this User") == true) {
            if (user.designation == 'Station Manager') {
                this.userService.stationManagerCheck(user.stationId).subscribe(function (data) {
                    if (JSON.stringify(data) == 'true') {
                        _this.alertService.error("The selected station already has a manager. De-activate the existing manager and proceed");
                    }
                    else {
                        _this.userService.activateUser(user.id).subscribe(function (data) {
                            _this.getAllBusinessPortalUsers();
                        }, function (error) {
                            console.log(error);
                            _this.alertService.error("User Activation Unsuccessful. Please Try Again or Contact Administrator");
                        });
                    }
                }, function (error) {
                    console.log(error);
                    _this.alertService.error("User Activation Unsuccessful. Please Try Again or Contact Administrator");
                });
            }
            else {
                this.userService.activateUser(user.id).subscribe(function (data) {
                    _this.getAllBusinessPortalUsers();
                }, function (error) {
                    console.log(error);
                    _this.alertService.error("User Activation Unsuccessful. Please Try Again or Contact Administrator");
                });
            }
        }
    };
    PortalUserComponent.prototype.deactivateUser = function (user) {
        var _this = this;
        if (confirm("Are you sure you want to de-activate this User") == true) {
            this.userService.deactivateUser(user.id).subscribe(function (data) {
                _this.getAllBusinessPortalUsers();
            }, function (error) {
                console.log(error);
                _this.alertService.error("User De-Activation Unsuccessful. Please Try Again or Contact Administrator");
            });
        }
    };
    PortalUserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'portaluser',
            templateUrl: 'portaluser.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, alert_service_1.AlertService, core_1.ElementRef])
    ], PortalUserComponent);
    return PortalUserComponent;
}());
exports.PortalUserComponent = PortalUserComponent;
//# sourceMappingURL=portaluser.component.js.map