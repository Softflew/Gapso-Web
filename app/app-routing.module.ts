import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import {SuperAdminGuard} from './guards/superadmin.guard';
import {StationManagerGuard} from './guards/stationmanager.guard';
import {AttendantGuard} from './guards/attendant.guard';
import {LoginComponent} from './login/login.component';
import {DashBoardComponent} from './dashboard/dashboard.component';
import {RegisterComponent} from './register/register.component';
import {BusinessComponent} from './business/business.component';
import {StationComponent} from './station/station.component';
import {ProfileComponent} from './header/profile.component';
import {ChangePasswordComponent} from './header/changepassword.component';
import {PortalUserComponent} from './portaluser/portaluser.component';
import {BusinessApprovalComponent} from './businessapproval/businessapproval.component';
import {EmailCheckComponent} from './changepassword/emailcheck.component';
import {ChangePasswordGuard} from './guards/changePassword.guard';
import {ProductComponent} from './product/product.component';
import {AttendantMgtComponent} from './attendantmgt/attendantmgt.component';
import {DailyActivityComponent} from './dailyactivity/dailyactivity.component';
import {DailySalesComponent} from './dailysales/dailysales.component';
import {ProductSettingComponent} from './productSetting/productsetting.component';
import {StationSettingComponent} from './stationsetting/stationsetting.component';
import {PaymentComponent} from './payment/payment.component';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'emailcheck', component: EmailCheckComponent, canActivate: [ChangePasswordGuard]},
    {path: 'dashboard', component: DashBoardComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'business', component: BusinessComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'station', component: StationComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'product', component: ProductComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'payment', component: PaymentComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'portaluser', component: PortalUserComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'changepassword', component: ChangePasswordComponent, canActivate: [AuthGuard]},
    {path: 'businessapproval', component: BusinessApprovalComponent, canActivate: [AuthGuard, SuperAdminGuard]},
    {path: 'productsetting', component: ProductSettingComponent, canActivate: [AuthGuard, StationManagerGuard]},
    {path: 'dailyactivity', component: DailyActivityComponent, canActivate: [AuthGuard, StationManagerGuard]},
    {path: 'attendantmgt', component: AttendantMgtComponent, canActivate: [AuthGuard, StationManagerGuard]},
    {path: 'stationsetting', component: StationSettingComponent, canActivate: [AuthGuard, StationManagerGuard]},
    {path: 'dailysales', component: DailySalesComponent, canActivate: [AuthGuard, AttendantGuard]}



];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
