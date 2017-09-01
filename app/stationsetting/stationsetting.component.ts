import {Component, ElementRef} from '@angular/core';
import {User} from '../model/User';
import {StationProduct} from '../model/StationProduct';
import {Product} from '../model/Product';
import {ProductDispensingPoint} from '../model/ProductDispensingPoint';
import {StationPaymentOption} from '../model/StationPaymentOption';
import {Station} from '../model/Station';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';

@Component({
    moduleId: module.id,
    selector: 'stationsetting',
    templateUrl: 'stationsetting.component.html'
})

export class StationSettingComponent {
    user = new User();
    activeProducts: Product[];
    stationProducts: StationProduct[];
    pdps: ProductDispensingPoint[];
    station = new Station();
    stationProduct = new StationProduct();
    pdp = new ProductDispensingPoint();
    editPdp = new ProductDispensingPoint();
    productId: number;
    editProductId: number;
    editAttendantId: number;
    attendants: User[];
    attendantId: number;
    activeStationPaymentOptions: StationPaymentOption[];
    inactivePaymentOptions: StationPaymentOption[];
    checkedBusinessPaymentOptions: number[] = [];
    checkedStationPaymentOptions: number[] = [];
    stationPaymentOptions: StationPaymentOption[];

    constructor(private userService: UserService, private alertService: AlertService,
        private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.station = JSON.parse(sessionStorage.getItem('station'));

        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);

        this.getAllStationProduct();
        this.getDispensingPointByStation();
        this.filterStationAttendants();
        this.getAllStationPaymentOption();
    }

    getDispensingPointByStation() {
        this.pdps = [];
        this.userService.getDispensingPointByStation(this.station.id).subscribe(
            data => {
                for (let u of data) {
                    this.userService.getActiveDispensingPointAttendant(u.id).subscribe(
                        data => {
                            if (data != null) {
                                u.currentAttendant = data.firstName + " " + data.surname;
                            }
                        },
                        error => {
                            console.log(error);
                        });
                    this.pdps.push(u);
                }
            },
            error => {
                console.log(error);
            });
    }

    getAllStationProduct() {
        this.stationProducts = [];
        this.activeProducts = [];
        this.userService.getStationProduct(this.station.id).subscribe(
            data => {
                this.stationProducts = data;
                for (let u of this.stationProducts) {
                    if (u.active == true) {
                        this.activeProducts.push(u.product);
                    }
                }
            },
            error => {
                console.log(error);
            });
    }

    filterStationAttendants() {
        this.attendants = [];
        this.userService.filterStationAttendants(this.station.id).subscribe(
            data => {
                this.attendants = data;
            },
            error => {
                console.log(error);
            });
    }


    createDispensingPoint() {
        if (this.productId != null && this.pdp.name != "") {
            for (let u of this.activeProducts) {
                if (this.productId == u.id) {
                    this.pdp.product = u;
                    break;
                }
            }
            this.pdp.station = this.station;
            this.userService.createProductDispensingPoint(this.pdp).subscribe(
                data => {
                    if (this.attendantId != null && this.attendantId > 0) {
                        this.userService.createDispensingPointAttendant(this.attendantId, data.id).subscribe(
                            data => {
                            },
                            error => {
                                console.log(error);
                                this.alertService.error("Product Dispensing Point Creation Unsuccessful. Please Try Again or Contact Administrator");
                            });
                    }
                    this.alertService.success('Product Dispensing Point Created Successfully', true);
                    this.pdp = new ProductDispensingPoint();
                    this.productId = 0;
                    this.attendantId = 0;
                    this.getDispensingPointByStation();
                    this.filterStationAttendants();
                },
                error => {
                    console.log(error);
                    this.alertService.error("Product Dispensing Point Creation Unsuccessful. Please Try Again or Contact Administrator");
                });
        } else {

        }

    }

    updateDispensingPoint() {
        for (let u of this.activeProducts) {
            if (this.editProductId == u.id) {
                this.editPdp.product = u;
                break;
            }
        }
        this.userService.updateProductDispensingPoint(this.editPdp).subscribe(
            data => {
                if (this.editAttendantId == 0 || this.editAttendantId > 0) {
                    this.userService.updateProductDispensingPointAttendant(this.editAttendantId, data.id).subscribe(
                        data => {
                            this.userService.getActiveDispensingPointAttendant(this.editPdp.id).subscribe(
                                data => {
                                    this.filterStationAttendants();
                                    this.getDispensingPointByStation();
                                    this.editPdp.currentAttendant = "";
                                    if (data != null) {
                                        this.editPdp.currentAttendant = data.firstName + " " + data.surname;
                                    }
                                },
                                error => {
                                    console.log(error);
                                });
                        },
                        error => {
                            console.log(error);
                            this.alertService.error("Product Dispensing Point Update Unsuccessful. Please Try Again or Contact Administrator");
                        });
                }
                this.alertService.success('Product Dispensing Point Updated Successfully', true);
                this.getDispensingPointByStation();
                this.filterStationAttendants();
            },
            error => {
                console.log(error);
                this.alertService.error("Product Dispensing Point Update Unsuccessful. Please Try Again or Contact Administrator");
            });
    }

    resetDispensePointAttendant() {
        if (confirm("Are you sure you want to remove all the Attendant(s) attached to all the Dispensing Point(s) of this station?") == true) {
            this.userService.resetDispensingPointAttendants(this.station.id).subscribe(
                data => {
                    this.alertService.success('Operation was Successfully', true);
                    this.getDispensingPointByStation();
                    this.filterStationAttendants();
                },
                error => {
                    console.log(error);
                    this.alertService.error("Product Dispensing Point Update Unsuccessful. Please Try Again or Contact Administrator");
                });
        } else {

        }
    }

    getAllStationPaymentOption() {
        this.checkedBusinessPaymentOptions = [];
        this.checkedStationPaymentOptions = [];
        this.stationPaymentOptions = [];
        this.activeStationPaymentOptions = [];
        this.inactivePaymentOptions = [];
        this.userService.getStationPaymentOption(this.station.id).subscribe(
            data => {
                this.stationPaymentOptions = data;
                for (let u of this.stationPaymentOptions) {
                    if (u.active == true) {
                        this.activeStationPaymentOptions.push(u);
                    } else {
                        this.inactivePaymentOptions.push(u);
                    }
                }
            },
            error => {
                console.log(error);
            });
    }

    public businessPaymentOptionOnClick(id: number, e: any): void {
        if (e.target.checked) {
            this.checkedBusinessPaymentOptions.push(id);
        }

        if (!e.target.checked) {
            for (let bp of this.checkedBusinessPaymentOptions) {
                if (id == bp) {
                    let index: number = this.checkedBusinessPaymentOptions.indexOf(bp);
                    if (index !== -1) {
                        this.checkedBusinessPaymentOptions.splice(index, 1);
                    }
                }
            }
        }
    }

    public stationPaymentOptionOnClick(id: number, e: any): void {
        if (e.target.checked) {
            this.checkedStationPaymentOptions.push(id);
        }

        if (!e.target.checked) {
            for (let bp of this.checkedStationPaymentOptions) {
                if (id == bp) {
                    let index: number = this.checkedStationPaymentOptions.indexOf(bp);
                    if (index !== -1) {
                        this.checkedStationPaymentOptions.splice(index, 1);
                    }
                }
            }
        }
    }

    addStationPaymentOption() {
        this.userService.createStationPaymentOption(this.checkedBusinessPaymentOptions).subscribe(
            data => {
                this.getAllStationPaymentOption();
            },
            error => {
                console.log(error);
            });
    }

    removeStationPaymentOption() {
        this.userService.removeStationPaymentOption(this.checkedStationPaymentOptions).subscribe(
            data => {
                this.getAllStationPaymentOption();
            },
            error => {
                console.log(error);
            });
    }
    
    activateDispensingPoint(pdp: ProductDispensingPoint) {
        if (confirm("Are you sure you want to activate this Product Dispensing Point") == true) {
            this.userService.activateProductDispensingPoint(pdp.id).subscribe(
                data => {
                    this.getDispensingPointByStation();
                },
                error => {
                    console.log(error);
                    this.alertService.error("Product Dispensing Point Activation Unsuccessful. Please Try Again or Contact Administrator");
                });
        } 
    }

    deactivateDispensingPoint(pdp: ProductDispensingPoint) {
        if (confirm("Are you sure you want to de-activate this Product Dispensing Point") == true) {
            this.userService.deactivateProductDispensingPoint(pdp.id).subscribe(
                data => {
                    this.getDispensingPointByStation();
                },
                error => {
                    console.log(error);
                    this.alertService.error("Product Dispensing Point De-Activation Unsuccessful. Please Try Again or Contact Administrator");
                });
        }
    }


    openDispensePoint(pdp: ProductDispensingPoint) {
        this.filterStationAttendants();
        this.editPdp = pdp;
        this.editProductId = pdp.product.id;
        this.editAttendantId = -1;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalDispensePoint");
        modalAnchor.click();
    }
}
