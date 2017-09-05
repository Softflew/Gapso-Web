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
var PortalUserRole_1 = require('../model/PortalUserRole');
var generic_service_1 = require('../service/generic.service');
var read_service_1 = require('../service/read.service');
var alert_service_1 = require('../service/alert.service');
var http_1 = require('@angular/http');
var LoginComponent = (function () {
    function LoginComponent(route, genericService, readService, alertService, router, elementRef, jsonp) {
        this.route = route;
        this.genericService = genericService;
        this.readService = readService;
        this.alertService = alertService;
        this.router = router;
        this.elementRef = elementRef;
        this.jsonp = jsonp;
        this.user = new User_1.User();
        this.role = new PortalUserRole_1.PortalUserRole();
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.genericService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
        this.newUser();
        sessionStorage.setItem('currentURL', JSON.stringify(this.returnUrl.substring(1)));
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
    };
    //  logUserSession(userEmail: string, userId: number) {
    //        var script = docu        ment.createElement("script");
    //        scr        ipt.type = "text/javascript";
    //        script.src = "http://jsonip.apps        pot.com/?callback=DisplayIP";
    //        document.getElementsByTagName("head")[0]        .appendChild(script);
    //        this.jsonp.get('//api.ipify.org/?format=jsonp&callback=JSONP        _CALLBACK').subscribe(
    //            response => cons        ole.log(response.id));
    //        this.userService.        ipAddress().subscribe(
    //            data => {
    //                        console.log(data.i        p);
    //                        
    //            },
    //                    error => {
    //                        console.log(error);
    //                this.alertService.error("Invalid Email Address/Password        , please try again.");
    //            });
    //        $.getJSON('//freegeoip.net/json/?callback=?', function (data) {
    //            $.getJSON('http://localhost:8080/Gapso-web/service/logUserSession?userEmail=' + userEmail + '&ipaddress=' + data.ip + '&userId=' + userId, function (data) {
    //            });
    //        });
    // }
    LoginComponent.prototype.loginUser = function () {
        var _this = this;
        this.genericService.login(this.user.emailAddress, this.user.password).subscribe(function (data) {
            _this.handleUserRole(data);
        }, function (error) {
            console.log(error);
            _this.alertService.error("Invalid Password.");
        });
    };
    LoginComponent.prototype.handleUserRole = function (loggedInUser) {
        var _this = this;
        this.readService.getUserRole(loggedInUser.id).subscribe(function (data) {
            if (data != null) {
                if (data.designation == 'SUPERADMIN') {
                    sessionStorage.setItem('role', JSON.stringify(data));
                    sessionStorage.setItem('currentUser', JSON.stringify(loggedInUser));
                    // this.logUserSession(loggedInUser.emailAddress, loggedInUser.id);
                    _this.router.navigate([_this.returnUrl]);
                }
                else if (data.designation == 'BUSINESSMANAGER') {
                    if (data.business.approved == true && data.business.active == true) {
                        sessionStorage.setItem('role', JSON.stringify(data));
                        sessionStorage.setItem('business', JSON.stringify(data.business));
                        sessionStorage.setItem('currentUser', JSON.stringify(loggedInUser));
                        // this.logUserSession(loggedInUser.emailAddress, loggedInUser.id);
                        _this.genericService.continiousUserValidityCheck();
                        _this.router.navigate([_this.returnUrl]);
                    }
                    else {
                        _this.alertService.error("Your Business is in-active, please contact admin.");
                    }
                }
                else if (data.designation == "ATTENDANT") {
                    if (data.station != null) {
                        if (data.station.active) {
                            if (data.dispensingPointAttendant != null) {
                                sessionStorage.setItem('role', JSON.stringify(data));
                                sessionStorage.setItem('business', JSON.stringify(data.business));
                                sessionStorage.setItem('station', JSON.stringify(data.station));
                                sessionStorage.setItem('currentUser', JSON.stringify(loggedInUser));
                                sessionStorage.setItem('dispensingPointAttendant', JSON.stringify(data.dispensingPointAttendant));
                                sessionStorage.setItem('dispensingPoint', JSON.stringify(data.dispensingPointAttendant.dispensingPoint));
                                _this.genericService.continiousUserValidityCheck();
                                _this.router.navigate([_this.returnUrl]);
                            }
                            else {
                                _this.alertService.error("You don't have a dispensing point assigned to you, please contact admin.");
                            }
                            _this.alertService.error("You don't have a dispensing point assigned to you, please contact admin.");
                        }
                    }
                    else {
                        _this.alertService.error("You don't have a dispensing point assigned to you, please contact admin.");
                    }
                }
                else if (data.designation == "STATIONMANAGER") {
                    if (data.station != null) {
                        if (data.station.active) {
                            sessionStorage.setItem('role', JSON.stringify(data));
                            sessionStorage.setItem('business', JSON.stringify(data.business));
                            sessionStorage.setItem('station', JSON.stringify(data.station));
                            sessionStorage.setItem('currentUser', JSON.stringify(loggedInUser));
                            // this.logUserSession(loggedInUser.emailAddress, loggedInUser.id);
                            _this.genericService.continiousUserValidityCheck();
                            _this.router.navigate([_this.returnUrl]);
                        }
                        else {
                            _this.alertService.error("You don't have a station assigned to you, please contact admin.");
                        }
                    }
                    else {
                        _this.alertService.error("You don't have a station assigned to you, please contact admin.");
                    }
                }
            }
            else {
                _this.alertService.error("You don't have a role assigned to you, please contact admin.");
            }
        }, function (error) {
            console.log(error);
            _this.alertService.error("Unable to Login, please contact admin.");
        });
    };
    LoginComponent.prototype.validateLoginEmail = function () {
        var _this = this;
        this.genericService.validateLoginEmail(this.user.emailAddress).subscribe(function (data) {
            if (!data.active) {
                _this.alertService.error("User is disabled. Please contact admin.");
            }
            else {
                _this.loginUser();
            }
        }, function (error) {
            console.log(error);
            _this.alertService.error("Email address does not exist");
        });
    };
    LoginComponent.prototype.newUser = function () {
        this.user = new User_1.User();
    };
    LoginComponent.prototype.startChangePassword = function () {
        sessionStorage.setItem('changePassword', JSON.stringify(true));
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: 'login.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, generic_service_1.GenericService, read_service_1.ReadService, alert_service_1.AlertService, router_1.Router, core_1.ElementRef, http_1.Jsonp])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map