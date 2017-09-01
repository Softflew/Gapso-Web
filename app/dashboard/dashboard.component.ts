import {Component} from '@angular/core';
import {PortalUserRole} from '../model/PortalUserRole';
import {Business} from '../model/Business';
import {Station} from '../model/Station';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashBoardComponent {
    role = new PortalUserRole();
    business = new Business();
    station = new Station();
    designation: string;
    constructor() {
    }

    ngOnInit(): void {
        this.role = JSON.parse(sessionStorage.getItem('role'));

        if (this.role.business != null) {
            this.business = this.role.business;
        }

        if (this.role.station != null) {
            this.station = this.role.station;
        }

        var superAdminContent = document.getElementById("superAdminContent");
        superAdminContent.hidden = true;

        var businessManagerContent = document.getElementById("businessManagerContent");
        businessManagerContent.hidden = true;

        var stationManagerContent = document.getElementById("stationManagerContent");
        stationManagerContent.hidden = true;

        var attendantContent = document.getElementById("attendantContent");
        attendantContent.hidden = true;

        if (this.role.designation == 'SUPERADMIN') {
            this.designation = 'Super Admin';
            superAdminContent.hidden = false;
        }
        if (this.role.designation == 'BUSINESSMANAGER') {
            this.designation = 'Business Manager';
            businessManagerContent.hidden = false;
        }
        if (this.role.designation == 'STATIONMANAGER') {
            this.designation = 'Station Manager';
            stationManagerContent.hidden = false;
        }
        if (this.role.designation == 'ATTENDANT') {
            this.designation = 'Sales Attendant';
            attendantContent.hidden = false;
        }

    }
}
