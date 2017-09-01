import {Component} from '@angular/core';
import {User} from '../model/User';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';

@Component({
    moduleId: module.id,
    selector: 'emailcheck',
    templateUrl: 'emailcheck.component.html'
})

export class EmailCheckComponent {
    user = new User();

    constructor(
        private userService: UserService,
        private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.newUser();
    }

    validateEmail() {
        this.userService.validateEmail(this.user.emailAddress).subscribe(
            data => {
                this.newUser();
                this.alertService.success("A new password has been sent to your email.  Please check");
            }, error => {
                console.log(error);
                this.alertService.error("Email address is not valid");
            });
    }

    endChangePassword() {
        sessionStorage.removeItem("changePassword");
    }

    newUser() {
        this.user = new User();
    }
}
