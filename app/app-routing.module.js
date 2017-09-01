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
var auth_guard_1 = require('./guards/auth.guard');
var admin_guard_1 = require('./guards/admin.guard');
var superadmin_guard_1 = require('./guards/superadmin.guard');
var stationmanager_guard_1 = require('./guards/stationmanager.guard');
var attendant_guard_1 = require('./guards/attendant.guard');
var login_component_1 = require('./login/login.component');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var register_component_1 = require('./register/register.component');
var business_component_1 = require('./business/business.component');
var station_component_1 = require('./station/station.component');
var profile_component_1 = require('./header/profile.component');
var changepassword_component_1 = require('./header/changepassword.component');
var portaluser_component_1 = require('./portaluser/portaluser.component');
var businessapproval_component_1 = require('./businessapproval/businessapproval.component');
var emailcheck_component_1 = require('./changepassword/emailcheck.component');
var changePassword_guard_1 = require('./guards/changePassword.guard');
var product_component_1 = require('./product/product.component');
var attendantmgt_component_1 = require('./attendantmgt/attendantmgt.component');
var dailyactivity_component_1 = require('./dailyactivity/dailyactivity.component');
var dailysales_component_1 = require('./dailysales/dailysales.component');
var productsetting_component_1 = require('./productSetting/productsetting.component');
var stationsetting_component_1 = require('./stationsetting/stationsetting.component');
var payment_component_1 = require('./payment/payment.component');
var routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'emailcheck', component: emailcheck_component_1.EmailCheckComponent, canActivate: [changePassword_guard_1.ChangePasswordGuard] },
    { path: 'dashboard', component: dashboard_component_1.DashBoardComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'business', component: business_component_1.BusinessComponent, canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard] },
    { path: 'station', component: station_component_1.StationComponent, canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard] },
    { path: 'product', component: product_component_1.ProductComponent, canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard] },
    { path: 'payment', component: payment_component_1.PaymentComponent, canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard] },
    { path: 'portaluser', component: portaluser_component_1.PortalUserComponent, canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard] },
    { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'changepassword', component: changepassword_component_1.ChangePasswordComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'businessapproval', component: businessapproval_component_1.BusinessApprovalComponent, canActivate: [auth_guard_1.AuthGuard, superadmin_guard_1.SuperAdminGuard] },
    { path: 'productsetting', component: productsetting_component_1.ProductSettingComponent, canActivate: [auth_guard_1.AuthGuard, stationmanager_guard_1.StationManagerGuard] },
    { path: 'dailyactivity', component: dailyactivity_component_1.DailyActivityComponent, canActivate: [auth_guard_1.AuthGuard, stationmanager_guard_1.StationManagerGuard] },
    { path: 'attendantmgt', component: attendantmgt_component_1.AttendantMgtComponent, canActivate: [auth_guard_1.AuthGuard, stationmanager_guard_1.StationManagerGuard] },
    { path: 'stationsetting', component: stationsetting_component_1.StationSettingComponent, canActivate: [auth_guard_1.AuthGuard, stationmanager_guard_1.StationManagerGuard] },
    { path: 'dailysales', component: dailysales_component_1.DailySalesComponent, canActivate: [auth_guard_1.AuthGuard, attendant_guard_1.AttendantGuard] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map