import {Component, ElementRef} from '@angular/core';
import {User} from '../model/User';
import {ProductDispensingPoint} from '../model/ProductDispensingPoint';
import {DispensingPointAttendant} from '../model/DispensingPointAttendant';
import {Product} from '../model/Product';
import {StationProduct} from '../model/StationProduct';
import {Station} from '../model/Station';
import {StationProductPrice} from '../model/StationProductPrice';
import {DailySales} from '../model/DailySales';
import {StationPaymentOption} from '../model/StationPaymentOption';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';
import {Observable} from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'dailysales',
    templateUrl: 'dailysales.component.html'
})

export class DailySalesComponent {
    user = new User();
    pdp = new ProductDispensingPoint();
    dpa = new DispensingPointAttendant();
    product = new Product();
    station = new Station();
    stationProduct = new StationProduct();
    stationProductPrice = new StationProductPrice();
    salesUnit: number;
    salesAmount: number;
    minProductLevel: number;
    currentProductLevel: number;
    todaySalesQuantity: Number;
    todaySalesAmount: Number;
    paymentOptionId: number;
    stationPaymentOptions: StationPaymentOption[] = [];
    todaySales: DailySales[] = [];
    today: number = Date.now();
    
    constructor(private userService: UserService, private alertService: AlertService,
        private elementRef: ElementRef) {
    }

    checkProductAvailability(currentSale: number): boolean {
        if ((this.currentProductLevel - currentSale) <= 0) {
            return false;
        }
        return true;
    }

    realTimeProductLevel() {
        const url = `${this.userService.getCurrentProductLevelURL}stationProductId=${this.stationProduct.id}`;
        Observable.interval(1000)
            .switchMap(() => this.userService.http.get(url))
            .map((data) => data.json())
            .subscribe((data) => {
                this.currentProductLevel = data;
            });
    }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.pdp = JSON.parse(sessionStorage.getItem('dispensingPoint'));
        this.dpa = JSON.parse(sessionStorage.getItem('dispensingPointAttendant'));
        if (this.pdp != null) {
            this.product = this.pdp.product;
            this.station = this.pdp.station;
            this.getStationProduct();
            this.getStationPaymentOptions();

        }

        if (this.dpa != null) {
            this.getTodaySales();
        }
    }

    getStationPaymentOptions() {
        this.userService.getStationPaymentOption(this.station.id).subscribe(
            data => {
                for (let u of data) {
                    if (u.active == true) {
                        this.stationPaymentOptions.push(u);
                    }
                }
            },
            error => {
                console.log(error);
            });
    }

    getTodaySales() {
        this.userService.getTodaySaleQuantity(this.dpa.id).subscribe(
            data => {
                this.todaySalesQuantity = data;
            },
            error => {
                console.log(error);
            });

        this.userService.getTodaySaleAmount(this.dpa.id).subscribe(
            data => {
                this.todaySalesAmount = data;
            },
            error => {
                console.log(error);
            });
            
            this.userService.getTodaySale(this.dpa.id).subscribe(
            data => {
                this.todaySales = data;
            },
            error => {
                console.log(error);
            });
    }

    getStationProduct() {
        this.userService.getStationProductByStationAndProduct(this.station.id, this.product.id).subscribe(
            data => {
                this.stationProduct = new StationProduct();
                this.stationProduct = data;
                this.realTimeProductLevel();
                this.userService.getActiveStationProductMinLevel(this.stationProduct.id).subscribe(
                    data => {
                        if (data != null) {
                            this.stationProduct.currentMinLevel = data.mininumLevel;
                        }
                    },
                    error => {
                        console.log(error);
                    });

                this.userService.getActiveStationProductPrice(this.stationProduct.id).subscribe(
                    data => {
                        this.stationProductPrice = data;
                        if (data != null) {
                            this.stationProduct.currentPrice = data.price;
                        }
                    },
                    error => {
                        console.log(error);
                    });

                //                this.userService.getCurrentProductLevel(this.stationProduct.id).subscribe(
                //                    data => {
                //                        this.currentProductLevel = data;
                //                    },
                //                    error => {
                //                        console.log(error);
                //                    });
            },
            error => {
                console.log(error);
            });
    }

    recordSales() {
        var dailySales = new DailySales();
        dailySales.stationProductPrice = this.stationProductPrice;
        dailySales.dispensingPointAttendant = this.dpa;
        if (this.salesUnit != null) {
            dailySales.quantity = this.salesUnit;
        }
        if (this.salesAmount != null) {
            dailySales.quantity = (this.salesAmount / this.stationProductPrice.price);
        }

        if (this.checkProductAvailability(dailySales.quantity)) {
            dailySales.paymentOptionId = this.paymentOptionId;
            this.userService.recordSales(dailySales).subscribe(
                data => {
                    this.paymentOptionId = null;
                    this.salesUnit = null;
                    this.salesAmount = null;
                    this.getTodaySales();
                    this.getStationProduct();
                },
                error => {
                    console.log(error);
                });
        } else {
            this.alertService.error("There is isn't enough product to sell");
        }

    }



    saleType(saletype: string) {
        if (saletype == 'amount') {
            var unit = document.getElementById("unit");
            unit.hidden = true;

            var unitInput = document.getElementById("unitInput");
            unitInput.setAttribute('disabled', 'disabled');

            var amount = document.getElementById("amount");
            amount.hidden = false;

            var amountInput = document.getElementById("amountInput");
            amountInput.removeAttribute('disabled');

            this.salesUnit = null;
        }
        if (saletype == 'unit') {
            var amount = document.getElementById("amount");
            amount.hidden = true;

            var amountInput = document.getElementById("amountInput");
            amountInput.setAttribute('disabled', 'disabled');

            var unit = document.getElementById("unit");
            unit.hidden = false;

            var unitInput = document.getElementById("unitInput");
            unitInput.removeAttribute('disabled');

            this.salesAmount = null;
        }
    }
    
    openSales() {
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalSales");
        modalAnchor.click();
    }
}
