import {Component, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/User'
import {Business} from '../model/Business'
import {PortalUserRole} from '../model/PortalUserRole'
import {AlertService} from '../service/alert.service';
import {CreateService} from '../service/create.service';
import {DeleteService} from '../service/delete.service';
import {GenericService} from '../service/generic.service';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    genders: String[] = [];
    users: User[];
    submitted = false;
    user = new User();
    business = new Business();
    portalUserRole = new PortalUserRole();

    constructor(
        private alertService: AlertService,
        private createService: CreateService,
        private deleteService: DeleteService,
        private genericService: GenericService,
        private router: Router,
        private elementRef: ElementRef) {
    }

    registerUser() {
        if (this.user.firstName == null || this.user.surname == null || this.user.emailAddress == null
            || this.user.phoneNumber == null || this.business.name == null || this.submitted == false) {
        } else {
            this.createService.createUser(this.user).subscribe(
                user => {
                    this.business.owner = user;
                    user.designation = this.genericService.businessManager;
                    this.createService.createBusiness(this.business).subscribe(
                        business => {
                            this.portalUserRole.business = business;
                            this.portalUserRole.portalUser = user;
                            this.createService.createPortalUserRole(this.portalUserRole).subscribe(
                                portalUserRole => {
                                    this.genericService.sendNewUserEmail(user).subscribe(
                                        data => {
                                            sessionStorage.setItem('currentUser', JSON.stringify(user));
                                            sessionStorage.setItem('role', JSON.stringify(portalUserRole));
                                            this.alertService.success("Your Registration was Successful. \n\
                                            Registration Approval Notice will be sent to your email by the Administrator shortly. \n\
                                            Thank You!!!");
                                            this.newUser();

                                        },
                                        error => {
                                            this.deleteService.deletePortalUserRole(portalUserRole).subscribe();
                                            this.deleteService.deleteBusiness(business).subscribe();
                                            this.deleteService.deleteUser(user).subscribe();
                                            console.log(error);
                                            this.alertService.error("Registration Unsuccessful. Please Try Again or Contact Administrator");
                                            this.submitted = false;
                                        });
                                },
                                error => {
                                    console.log(error);
                                    this.deleteService.deleteBusiness(business).subscribe();
                                    this.deleteService.deleteUser(user).subscribe();
                                    this.alertService.error("Registration Unsuccessful. Please Try Again or Contact Administrator");
                                    this.submitted = false;
                                });
                        },
                        error => {
                            console.log(error);
                            this.deleteService.deleteUser(user).subscribe();
                            this.alertService.error("Registration Unsuccessful. Please Try Again or Contact Administrator");
                            this.submitted = false;
                        });
                },
                error => {
                    console.log(error);
                    this.alertService.error("Registration Unsuccessful. Please Try Again or Contact Administrator");
                    this.submitted = false;
                });
        }
    }

    ngOnInit(): void {
        this.newUser();

        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
    }

    newUser() {
        this.user = new User();
        this.business = new Business();
        this.portalUserRole = new PortalUserRole();
        this.submitted = false;
    }
}
