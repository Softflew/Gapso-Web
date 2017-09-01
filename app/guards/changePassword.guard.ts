import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class ChangePasswordGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (sessionStorage.getItem('changePassword')) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], {queryParams: {returnUrl: '/dashboard'}});
        return false;
    }
}

