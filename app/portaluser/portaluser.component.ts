import {Component, OnInit, ElementRef} from '@angular/core';
import {User} from '../model/User';
import {Business} from '../model/Business';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';
import {Station} from '../model/Station';

@Component({
    moduleId: module.id,
    selector: 'portaluser',
    templateUrl: 'portaluser.component.html'
})

export class PortalUserComponent implements OnInit {

    user = new User();
    portalUser = new User();
    business = new Business();
    designation: string;
    stationId: number;
    portalUsers: User[] = [];
    stations: Station[];
    designations: String[] = [];

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);

        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.business = JSON.parse(sessionStorage.getItem('business'));
        this.getAllBusinessPortalUsers();
        this.getAllBusinessStations();
        this.loadDesignation();
        this.portalUser = new User();
    }

    createUser() {
        if (this.portalUser.firstName == null || this.portalUser.firstName == "" ||
            this.portalUser.surname == null || this.portalUser.surname == "" ||
            this.portalUser.emailAddress == null || this.portalUser.emailAddress == "" ||
            this.stationId == null ||
            this.designation == null || this.designation == "") {
        } else {
            this.portalUser.setStationId(this.stationId);
            this.portalUser.setDesignation(this.designation);
            this.portalUser.setBusinessId(this.business.id);
            if (this.designation == 'Station Manager') {
                this.userService.stationManagerCheck(this.stationId).subscribe(
                    data => {
                        if (JSON.stringify(data) == 'true') {
                            this.alertService.error("The selected station already has a manager.");
                        } else {
                            this.userService.createPortalUser(this.portalUser).subscribe(
                                data => {
                                    this.alertService.success('User Created Successfully', false);
                                    this.portalUser = new User();
                                    this.designation = null;
                                    this.stationId = null;
                                    this.getAllBusinessPortalUsers();
                                },
                                error => {
                                    console.log(error);
                                    this.alertService.error("User Creation Unsuccessful. Please Try Again or Contact Administrator");
                                });
                        }
                    },
                    error => {
                        console.log(error);
                        this.alertService.error("User Creation Unsuccessful. Please Try Again or Contact Administrator");
                    });
            } else {
                this.userService.createPortalUser(this.portalUser).subscribe(
                    data => {
                        this.alertService.success('User Created Successfully', false);
                        this.portalUser = new User();
                        this.designation = null;
                        this.stationId = null;
                        this.getAllBusinessPortalUsers();
                    },
                    error => {
                        console.log(error);
                        this.alertService.error("User Creation Unsuccessful. Please Try Again or Contact Administrator");
                    });
            }

        }
    }

    updateRole() {
        this.portalUser.stationId = this.stationId;
        this.portalUser.designation = this.designation;
        this.portalUser.businessId = this.business.id
        this.userService.updatePortalUserRole(this.portalUser).subscribe(
            data => {
                this.alertService.success('User Role Updated Successfully', false);
                this.portalUser = new User();
                this.getAllBusinessPortalUsers();
            },
            error => {
                console.log(error);
                this.alertService.error("User Role Update Unsuccessful. Please Try Again or Contact Administrator");
            });
    }

    updateUserRole() {
        if (this.portalUser.designation == this.designation && this.portalUser.stationId == this.stationId) {
        } else {
            if (this.designation == 'Station Manager') {
                this.userService.stationManagerCheck(this.stationId).subscribe(
                    data => {
                        if (JSON.stringify(data) == 'true') {
                            this.alertService.error("The selected station already has a manager. De-activate the existing manager and proceed");
                        } else {
                            this.updateRole();
                        }
                    },
                    error => {
                        console.log(error);
                        this.alertService.error("User Role Update Unsuccessful. Please Try Again or Contact Administrator");
                    });
            } else {
                this.updateRole();
            }
        }
    }

    updateUser() {
        if (this.portalUser.firstName == null || this.portalUser.firstName == "" ||
            this.portalUser.surname == null || this.portalUser.surname == "" ||
            this.portalUser.emailAddress == null || this.portalUser.emailAddress == "") {
        } else {
            if (this.portalUser.designation == this.designation && this.portalUser.stationId == this.stationId) {
                this.userService.updatePortalUser(this.portalUser).subscribe(
                    data => {
                        this.alertService.success('User Updated Successfully', false);
                        this.portalUser = new User();
                        this.getAllBusinessPortalUsers();
                        //                        var modal = this.elementRef.nativeElement.querySelector("#modal-dialog").querySelector("#closeModal");
                        //                        modal.click();
                    },
                    error => {
                        console.log(error);
                        this.alertService.error("User Update Unsuccessful. Please Try Again or Contact Administrator");
                    });
            }
        }
    }

    openEdit(currentUser: User) {
        this.resetAlert();
        this.portalUser = currentUser;

        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalAnchor");
        modalAnchor.click();
    }

    openEditUserRole(currentUser: User) {
        this.resetAlert();
        this.portalUser = currentUser;

        if (currentUser.designation != null) {
            this.designation = currentUser.designation;
        }

        if (currentUser.stationId != null) {
            this.stationId = currentUser.stationId;
        }
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalUserRole");
        modalAnchor.click();
    }

    getAllBusinessPortalUsers() {
        this.userService.getBusinessStaff(this.business.id).subscribe(
            data => {
                for (let u of data) {
                    this.userService.getUserRole(u.id).subscribe(
                        udata => {
                            if (udata.station != null) {
                                u.stationId = udata.station.id;
                            }

                            if (udata.designation == "STATIONMANAGER") {
                                u.designation = 'Station Manager';
                                this.portalUsers.push(u);
                            }

                            if (udata.designation == "ATTENDANT") {
                                u.designation = 'Attendant';
                                this.portalUsers.push(u);
                            }
                        },
                        error => {
                            console.log(error);
                        });
                }

            },
            error => {
                console.log(error);
            });
    }

    resetAlert() {
        this.alertService.reset(false);
        this.portalUser = new User();
        this.designation = null;
        this.stationId = null
    }

    getAllBusinessStations() {
        this.userService.getActiveBusinessStation(this.business.id).subscribe(
            data => {
                if (data)
                    this.stations = data;
            },
            error => {
                console.log(error);
            });
    }

    loadDesignation() {
        this.designations.push('Attendant');
        this.designations.push('Station Manager');
    }

    activateUser(user: User) {
        if (confirm("Are you sure you want to activate this User") == true) {
            if (user.designation == 'Station Manager') {
                this.userService.stationManagerCheck(user.stationId).subscribe(
                    data => {
                        if (JSON.stringify(data) == 'true') {
                            this.alertService.error("The selected station already has a manager. De-activate the existing manager and proceed");
                        } else {
                            this.userService.activateUser(user.id).subscribe(
                                data => {
                                    this.getAllBusinessPortalUsers();
                                },
                                error => {
                                    console.log(error);
                                    this.alertService.error("User Activation Unsuccessful. Please Try Again or Contact Administrator");
                                });
                        }
                    },
                    error => {
                        console.log(error);
                        this.alertService.error("User Activation Unsuccessful. Please Try Again or Contact Administrator");
                    });
            } else {
                this.userService.activateUser(user.id).subscribe(
                    data => {
                        this.getAllBusinessPortalUsers();
                    },
                    error => {
                        console.log(error);
                        this.alertService.error("User Activation Unsuccessful. Please Try Again or Contact Administrator");
                    });
            }
        }
    }

    deactivateUser(user: User) {
        if (confirm("Are you sure you want to de-activate this User") == true) {
            this.userService.deactivateUser(user.id).subscribe(
                data => {
                    this.getAllBusinessPortalUsers();
                },
                error => {
                    console.log(error);
                    this.alertService.error("User De-Activation Unsuccessful. Please Try Again or Contact Administrator");
                });
        }
    }

}
