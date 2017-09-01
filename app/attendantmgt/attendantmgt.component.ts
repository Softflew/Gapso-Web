import {Component, ElementRef} from '@angular/core';
import {User} from '../model/User';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';
import {Station} from '../model/Station';

@Component({
    moduleId: module.id,
    selector: 'attendantmgt',
    templateUrl: 'attendantmgt.component.html'
})

export class AttendantMgtComponent {
    user = new User();
    station = new Station();
    attendants: User[];
    attendant = new User();
    constructor(private userService: UserService, private alertService: AlertService,
        private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.station = JSON.parse(sessionStorage.getItem('station'));

        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);

        this.getAllStationPortalUsers();
    }

    getAllStationPortalUsers() {
        this.userService.getStationStaff(this.station.id).subscribe(
            data => {
                this.attendants = data;
            },
            error => {
                console.log(error);
            });
    }

    activateAttendant(user: User) {
        if (confirm("Are you sure you want to activate this Attendant") == true) {
            this.userService.activateUser(user.id).subscribe(
                data => {
                    this.getAllStationPortalUsers();
                },
                error => {
                    console.log(error);
                    this.alertService.error("Attendant Activation Unsuccessful. Please Try Again or Contact Administrator");
                });
        } else {

        }
    }

    deactivateAttendant(user: User) {
        if (confirm("Are you sure you want to de-activate this Attendant") == true) {
            this.userService.deactivateUser(user.id).subscribe(
                data => {
                    this.getAllStationPortalUsers();
                },
                error => {
                    console.log(error);
                    this.alertService.error("Attendant De-Activation Unsuccessful. Please Try Again or Contact Administrator");
                });
        } else {

        }
    }

    openAttendantDetail(user: User) {
        this.attendant = user;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalAttendant");
        modalAnchor.click();
    }
}
