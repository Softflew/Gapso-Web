import {Component, ElementRef} from '@angular/core';
import {User} from '../model/User';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';

@Component({
    moduleId: module.id,
    selector: 'changepassword',
    templateUrl: 'changepassword.component.html'
})

export class ChangePasswordComponent {
    user = new User();
    oldpassword: string;
    newpassword: string;
    retrypassword: string;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
    }


    changePassword() {
        if (this.oldpassword == null || this.oldpassword == "" ||
            this.newpassword == null || this.newpassword == "" ||
            this.retrypassword == null || this.retrypassword == "") {
        } else if (this.retrypassword != this.newpassword) {
            this.alertService.error("New Password and Confirm Password does not match!!!!");
        } else {
            this.userService.login(this.user.emailAddress, this.oldpassword).subscribe(
                data => {
                    this.userService.changePassword(this.user.id, this.newpassword).subscribe(
                        data => {
                            this.alertService.success("Password changed successfully");
                        }, error => {
                            console.log(error);
                            this.alertService.error("Password change was unsuccessful. Please try again or contact admin.");
                        });
                }, error => {
                    console.log(error);
                    this.alertService.error("Password is incorrect!!!!");
                });
        }
    }


}
