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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var angular2_image_upload_1 = require('angular2-image-upload');
var index_1 = require('../node_modules/ng2-google-place-autocomplete/src/index');
var angular2_datatable_1 = require("angular2-datatable");
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('./app.component');
var register_component_1 = require('./register/register.component');
var login_component_1 = require('./login/login.component');
var business_component_1 = require('./business/business.component');
var portaluser_component_1 = require('./portaluser/portaluser.component');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var station_component_1 = require('./station/station.component');
var stationsetting_component_1 = require('./stationsetting/stationsetting.component');
var product_component_1 = require('./product/product.component');
var payment_component_1 = require('./payment/payment.component');
var header_component_1 = require('./header/header.component');
var sidebar_component_1 = require('./header/sidebar.component');
var user_service_1 = require('./service/user.service');
var alert_service_1 = require('./service/alert.service');
var auth_guard_1 = require('./guards/auth.guard');
var changePassword_guard_1 = require('./guards/changePassword.guard');
var admin_guard_1 = require('./guards/admin.guard');
var superadmin_guard_1 = require('./guards/superadmin.guard');
var stationmanager_guard_1 = require('./guards/stationmanager.guard');
var attendant_guard_1 = require('./guards/attendant.guard');
var alert_component_1 = require('./alert.component');
var profile_component_1 = require('./header/profile.component');
var changepassword_component_1 = require('./header/changepassword.component');
var businessapproval_component_1 = require('./businessapproval/businessapproval.component');
var emailcheck_component_1 = require('./changepassword/emailcheck.component');
var attendantmgt_component_1 = require('./attendantmgt/attendantmgt.component');
var dailyactivity_component_1 = require('./dailyactivity/dailyactivity.component');
var productsetting_component_1 = require('./productSetting/productsetting.component');
var dailysales_component_1 = require('./dailysales/dailysales.component');
require('./rxjs-extensions');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                index_1.GooglePlaceModule,
                angular2_image_upload_1.ImageUploadModule.forRoot(),
                angular2_datatable_1.DataTableModule,
                http_1.JsonpModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                alert_component_1.AlertComponent,
                dashboard_component_1.DashBoardComponent,
                business_component_1.BusinessComponent,
                station_component_1.StationComponent,
                header_component_1.HeaderComponent,
                profile_component_1.ProfileComponent,
                businessapproval_component_1.BusinessApprovalComponent,
                portaluser_component_1.PortalUserComponent,
                sidebar_component_1.SideBarComponent,
                emailcheck_component_1.EmailCheckComponent,
                changepassword_component_1.ChangePasswordComponent,
                product_component_1.ProductComponent,
                dailyactivity_component_1.DailyActivityComponent,
                productsetting_component_1.ProductSettingComponent,
                attendantmgt_component_1.AttendantMgtComponent,
                stationsetting_component_1.StationSettingComponent,
                payment_component_1.PaymentComponent,
                dailysales_component_1.DailySalesComponent
            ],
            providers: [
                user_service_1.UserService,
                alert_service_1.AlertService,
                auth_guard_1.AuthGuard,
                admin_guard_1.AdminGuard,
                superadmin_guard_1.SuperAdminGuard,
                changePassword_guard_1.ChangePasswordGuard,
                stationmanager_guard_1.StationManagerGuard,
                attendant_guard_1.AttendantGuard,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map