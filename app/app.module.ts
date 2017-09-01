import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {ImageUploadModule} from 'angular2-image-upload';
import {GooglePlaceModule} from '../node_modules/ng2-google-place-autocomplete/src/index';
import {DataTableModule} from "angular2-datatable";


import {AppRoutingModule} from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';

import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {BusinessComponent} from './business/business.component';
import {PortalUserComponent} from './portaluser/portaluser.component';
import {DashBoardComponent} from './dashboard/dashboard.component';
import {StationComponent} from './station/station.component';
import {StationSettingComponent} from './stationsetting/stationsetting.component';
import {ProductComponent} from './product/product.component';
import {PaymentComponent} from './payment/payment.component';
import {HeaderComponent} from './header/header.component';
import {SideBarComponent} from './header/sidebar.component';
import {UserService} from './service/user.service';
import {AlertService} from './service/alert.service';
import {AuthGuard} from './guards/auth.guard';
import {ChangePasswordGuard} from './guards/changePassword.guard';
import {AdminGuard} from './guards/admin.guard';
import {SuperAdminGuard} from './guards/superadmin.guard';
import {StationManagerGuard} from './guards/stationmanager.guard';
import {AttendantGuard} from './guards/attendant.guard';
import {AlertComponent} from './alert.component';
import {ProfileComponent} from './header/profile.component';
import {ChangePasswordComponent} from './header/changepassword.component';
import {BusinessApprovalComponent} from './businessapproval/businessapproval.component';
import {EmailCheckComponent} from './changepassword/emailcheck.component';
import {AttendantMgtComponent} from './attendantmgt/attendantmgt.component';
import {DailyActivityComponent} from './dailyactivity/dailyactivity.component';
import {ProductSettingComponent} from './productSetting/productsetting.component';
import {DailySalesComponent} from './dailysales/dailysales.component';


import './rxjs-extensions';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        GooglePlaceModule,
        ImageUploadModule.forRoot(),
        DataTableModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        DashBoardComponent,
        BusinessComponent,
        StationComponent,
        HeaderComponent,
        ProfileComponent,
        BusinessApprovalComponent,
        PortalUserComponent,
        SideBarComponent,
        EmailCheckComponent,
        ChangePasswordComponent,
        ProductComponent,
        DailyActivityComponent,
        ProductSettingComponent,
        AttendantMgtComponent,
        StationSettingComponent,
        PaymentComponent,
        DailySalesComponent
    ],

    providers: [
        UserService,
        AlertService,
        AuthGuard,
        AdminGuard,
        SuperAdminGuard,
        ChangePasswordGuard,
        StationManagerGuard,
        AttendantGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
