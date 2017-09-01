import {Component, OnInit, ElementRef} from '@angular/core';
import {User} from '../model/User';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';
import {PortalUserRole} from '../model/PortalUserRole';

@Component({
    moduleId: module.id,
    selector: 'profile',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent {
    user = new User();
    role = new PortalUserRole();
    designation: string;
    constructor(private userService: UserService,
        private alertService: AlertService,
        private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.role = JSON.parse(sessionStorage.getItem('role'));
        
        if (this.role.designation == 'BUSINESSMANAGER') {
            this.designation = 'Business Manager';
        }
    }

    updateUser() {
        if (this.user.firstName == null || this.user.firstName == "" ||
            this.user.surname == null || this.user.surname == "" ||
            this.user.emailAddress == null || this.user.emailAddress == "") {
        } else {
            this.userService.updatePortalUser(this.user).subscribe(
                data => {
                    this.alertService.success('User Updated Successfully', false);
                    sessionStorage.setItem('currentUser', JSON.stringify(data));
                    var modal = this.elementRef.nativeElement.querySelector("#modal-dialog").querySelector("#closeModal");
                    modal.click();
                },
                error => {
                    console.log(error);
                    this.alertService.error("Profile Update Unsuccessful. Please Try Again or Contact Administrator");
                    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
                    var modal = this.elementRef.nativeElement.querySelector("#modal-dialog").querySelector("#closeModal");
                    modal.click();
                });
        }
    }


}
