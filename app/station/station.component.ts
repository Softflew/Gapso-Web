import {Component, ElementRef} from '@angular/core';
import {User} from '../model/User';
import {PortalUserRole} from '../model/PortalUserRole';
import {Business} from '../model/Business';
import {Station} from '../model/Station';
import {Product} from '../model/Product';
import {StationProduct} from '../model/StationProduct';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';

@Component({
    moduleId: module.id,
    selector: 'station',
    templateUrl: 'station.component.html',

})

export class StationComponent {
    user = new User();
    role = new PortalUserRole();
    address: string;
    users: User[];
    stationManager = new User();
    stationAttendants: User[] = [];
    checkedBusinessProducts: number[] = [];
    checkedStationProducts: number[] = [];
    stations: Station[];
    stationProducts: StationProduct[];
    activeStationProducts: StationProduct[];
    inactiveStationProducts: StationProduct[];
    business = new Business();
    station = new Station();
    editStation = new Station();
    constructor(private userService: UserService, private alertService: AlertService,
        private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);

        var s2 = document.createElement("script");
        s2.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBZ7KCRuw5zamWrxs9YNg8a1odheU2FSbo&libraries=places';
        s2.type = 'text/javascript';
        this.elementRef.nativeElement.appendChild(s2);

        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.role = JSON.parse(sessionStorage.getItem('role'));
        this.business = JSON.parse(sessionStorage.getItem('business'));
        this.getAllBusinessStations();
    }

    createStation() {
        if (this.station.name == null || this.station.name == "") {
        } else {
            this.station.setBusiness(this.business);
            this.userService.createStation(this.station).subscribe(
                data => {
                    this.alertService.success('Station Created Successfully', false);
                    this.station = new Station();
                    this.getAllBusinessStations();
                },
                error => {
                    console.log(error);
                    this.alertService.error("Station Creation Unsuccessful. Please Try Again or Contact Administrator");
                });
        }
    }

    updateStation() {
        if (this.editStation.name == null || this.editStation.name == "") {
        } else {
            this.userService.updateStation(this.editStation).subscribe(
                data => {
                    this.alertService.success('Station Updated Successfully', false);
                    this.getAllBusinessStations();
                    //                    var modal = this.elementRef.nativeElement.querySelector("#modal-dialog").querySelector("#closeModal");
                    //                    modal.click();
                },
                error => {
                    console.log(error);
                    this.alertService.error("Station Update Unsuccessful. Please Try Again or Contact Administrator");
                });
        }
    }

    getAllBusinessStations() {
        this.userService.getBusinessStation(this.business.id).subscribe(
            data => {
                this.stations = data;

            },
            error => {
                console.log(error);
            });
    }



    getAllStationProduct(station: Station) {
        this.checkedBusinessProducts = [];
        this.checkedStationProducts = [];
        this.stationProducts = [];
        this.activeStationProducts = [];
        this.inactiveStationProducts = [];
        this.userService.getStationProduct(station.id).subscribe(
            data => {
                this.stationProducts = data;
                for (let u of this.stationProducts) {
                    if (u.active == true) {
                        this.activeStationProducts.push(u);
                    } else {
                        this.inactiveStationProducts.push(u);
                    }
                }
            },
            error => {
                console.log(error);
            });
    }


    getAddress(e: any): void {
        console.log(e);
        console.log(e.country);
    }


    openEdit(station: Station) {
        this.editStation = station;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalAnchor");
        modalAnchor.click();
    }

    openStaff(station: Station) {
        this.editStation = station;
        this.stationManager = new User;
        this.stationAttendants = [];
        this.getAllBusinessPortalUsers();
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalStaff");
        modalAnchor.click();
    }

    openProduct(station: Station) {
        this.editStation = station;
        this.getAllStationProduct(this.editStation);
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalProduct");
        modalAnchor.click();
    }

    public businessProductOnClick(id: number, e: any): void {
        if (e.target.checked) {
            this.checkedBusinessProducts.push(id);
        }

        if (!e.target.checked) {
            for (let bp of this.checkedBusinessProducts) {
                if (id == bp) {
                    let index: number = this.checkedBusinessProducts.indexOf(bp);
                    if (index !== -1) {
                        this.checkedBusinessProducts.splice(index, 1);
                    }
                }
            }
        }
    }

    public stationProductOnClick(id: number, e: any): void {
        if (e.target.checked) {
            this.checkedStationProducts.push(id);
        }

        if (!e.target.checked) {
            for (let bp of this.checkedStationProducts) {
                if (id == bp) {
                    let index: number = this.checkedStationProducts.indexOf(bp);
                    if (index !== -1) {
                        this.checkedStationProducts.splice(index, 1);
                    }
                }
            }
        }
    }

    addStationProduct() {
        this.userService.createStationProduct(this.checkedBusinessProducts).subscribe(
            data => {
                this.getAllStationProduct(this.editStation);
            },
            error => {
                console.log(error);
            });
    }

    removeStationProduct() {
        this.userService.removeStationProduct(this.checkedStationProducts).subscribe(
            data => {
                this.getAllStationProduct(this.editStation);
            },
            error => {
                console.log(error);
            });
    }

    getAllBusinessPortalUsers() {
        this.userService.getBusinessStaff(this.business.id).subscribe(
            data => {
                for (let u of data) {
                    this.userService.getUserRole(u.id).subscribe(
                        udata => {
                            if (udata.station != null) {
                                if (udata.station.id == this.editStation.id) {
                                    if (udata.designation == "ATTENDANT") {
                                        this.stationAttendants.push(u);
                                    }
                                    if (udata.designation == "STATIONMANAGER") {
                                        this.stationManager = u;
                                    }
                                }
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

}
