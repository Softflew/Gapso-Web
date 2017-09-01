import {Component, ElementRef} from '@angular/core';
import {User} from '../model/User';
import {PortalUserRole} from '../model/PortalUserRole';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';
import {Business} from '../model/Business';

@Component({
    moduleId: module.id,
    selector: 'businessapproval',
    templateUrl: 'businessapproval.component.html'
})

export class BusinessApprovalComponent {
    user = new User();
    role = new PortalUserRole();
    designation: string;
    businesses: Business[];

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        this.getAllBusiness();
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.role = JSON.parse(sessionStorage.getItem('role'));
    }

    getAllBusiness() {
        this.userService.getAllBusiness().subscribe(
            data => {
                this.businesses = data;
            },
            error => {
                console.log(error);
            });
    }

    approveBusiness(id: number) {
        if (confirm("Are you sure you want to approve this Business") == true) {
            this.userService.approveBusiness(id).subscribe(
                data => {
                    this.getAllBusiness();
                },
                error => {
                    console.log(error);
                });
        }
    }

    declineBusiness(id: number) {
        if (confirm("Are you sure you want to decline this Business") == true) {
            this.userService.declineBusiness(id).subscribe(
                data => {
                    this.getAllBusiness();
                },
                error => {
                    console.log(error);
                });
        }
    }
    
    activateBusiness(id: number) {
        if (confirm("Are you sure you want to activate this Business") == true) {
            this.userService.activateBusiness(id).subscribe(
                data => {
                    this.getAllBusiness();
                },
                error => {
                    console.log(error);
                });
        }
    }

    deactivateBusiness(id: number) {
        if (confirm("Are you sure you want to de-activate this Business") == true) {
            this.userService.deactivateBusiness(id).subscribe(
                data => {
                  this.getAllBusiness();
                },
                error => {
                    console.log(error);
                });
        }
    }
}
