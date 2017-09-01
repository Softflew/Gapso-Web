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
var PortalUserRole_1 = require('../model/PortalUserRole');
var router_1 = require('@angular/router');
var AttendantGuard = (function () {
    function AttendantGuard(router) {
        this.router = router;
        this.role = new PortalUserRole_1.PortalUserRole();
    }
    AttendantGuard.prototype.canActivate = function (route) {
        if (sessionStorage.getItem('role')) {
            this.role = JSON.parse(sessionStorage.getItem('role'));
            if (this.role.designation == 'ATTENDANT') {
                return true;
            }
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], { queryParams: { returnUrl: '/dashboard' } });
        return false;
    };
    AttendantGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AttendantGuard);
    return AttendantGuard;
}());
exports.AttendantGuard = AttendantGuard;
//# sourceMappingURL=attendant.guard.js.map