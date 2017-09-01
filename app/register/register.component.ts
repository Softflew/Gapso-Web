import {Component, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/User'
import {Business} from '../model/Business'
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';

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

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private router: Router, private elementRef: ElementRef) {
    }

    registerUser() {
        if (this.user.firstName == null || this.user.surname == null || this.user.emailAddress == null
            || this.user.phoneNumber == null || this.user.password == null || this.user.middleName == null
            || this.submitted == false) {
        } else {
            this.userService.createUser(this.user)
                .subscribe(
                data => {
                    sessionStorage.setItem('currentUser', JSON.stringify(data));
                    sessionStorage.setItem('role', JSON.stringify(data));
                    this.alertService.success("Your Registration was Successful. \n\
                                            Registration Approval Notice will be sent to your email by the Administrator shortly. \n\
                                            Thank You!!!");
                    this.newUser();
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
        this.submitted = false;
    }
}
