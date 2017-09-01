import {Injectable} from '@angular/core';
import {PortalUserRole} from '../model/PortalUserRole';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class SuperAdminGuard implements CanActivate {
    role = new PortalUserRole();
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (sessionStorage.getItem('role')) {
            this.role = JSON.parse(sessionStorage.getItem('role'));
            if (this.role.designation == 'SUPERADMIN') {
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
         this.router.navigate(['login'], {queryParams: {returnUrl: '/dashboard'}});
        return false;
    }
}

