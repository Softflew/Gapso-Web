import {Component, ElementRef} from '@angular/core';
import {User} from '../model/User';
import {StationProduct} from '../model/StationProduct';
import {Station} from '../model/Station';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';

@Component({
    moduleId: module.id,
    selector: 'productsetting',
    templateUrl: 'productsetting.component.html'
})

export class ProductSettingComponent {
    user = new User();
    activeStationProducts: StationProduct[];
    stationProducts: StationProduct[];
    currentProductPrice: number;
    currentProductMinLevel: number;
    currentProductLevel: number;
    currentProductName: string;
    currentProductCode: string;
    currentProductUnit: string;
    station = new Station();
    stationProduct = new StationProduct();
    newProductPrice: number;
    newProductMinLevel: number;
    newProductSupply: number;
    previousProductPrice: number;
    previousProductMinLevel: number;
    previousProductLevel: number;

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
    }

    getAllStationProduct() {
        this.stationProducts = [];
        this.activeStationProducts = [];
        this.userService.getStationProduct(this.station.id).subscribe(
            data => {
                this.stationProducts = data;
                for (let u of this.stationProducts) {
                    if (u.active == true) {
                        u.currentPrice = 0.0;
                        u.currentMinLevel = 0.0;
                        this.userService.getActiveStationProductPrice(u.id).subscribe(
                            data => {
                                if (data != null) {
                                    u.currentPrice = data.price;
                                }
                            },
                            error => {
                                console.log(error);
                            });
                        this.userService.getActiveStationProductMinLevel(u.id).subscribe(
                            data => {
                                if (data != null) {
                                    u.currentMinLevel = data.mininumLevel;
                                }
                            },
                            error => {
                                console.log(error);
                            });
                        this.activeStationProducts.push(u);
                    }
                }
            },
            error => {
                console.log(error);
            });
    }

    openPriceManager(stationProduct: StationProduct) {
        this.stationProduct = stationProduct;
        this.currentProductName = stationProduct.product.name;
        this.currentProductCode = stationProduct.product.productCode;
        this.currentProductPrice = stationProduct.currentPrice;
        this.newProductPrice = null;
        this.previousProductPrice = null;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalPriceManager");
        modalAnchor.click();
    }

    openMinLevelManager(stationProduct: StationProduct) {
        this.stationProduct = stationProduct;
        this.currentProductName = stationProduct.product.name;
        this.currentProductCode = stationProduct.product.productCode;
        this.currentProductMinLevel = stationProduct.currentMinLevel;
        this.currentProductUnit = stationProduct.product.unit;
        this.newProductMinLevel = null;
        this.previousProductMinLevel = null;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalMinLevelManager");
        modalAnchor.click();
    }

    openProductLevelManager(stationProduct: StationProduct) {
        this.stationProduct = stationProduct;
        this.currentProductName = stationProduct.product.name;
        this.currentProductCode = stationProduct.product.productCode;
        this.currentProductLevel = stationProduct.currentLevel;
        this.currentProductUnit = stationProduct.product.unit;
        this.newProductSupply = null;
        this.previousProductLevel = null;
        this.userService.getCurrentProductLevel(this.stationProduct.id).subscribe(
            data => {
                this.currentProductLevel = data;
            },
            error => {
                console.log(error);
                this.alertService.error("Please Try Again or Contact Administrator");
            });
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalLevelManager");
        modalAnchor.click();
    }

    updatePrice() {
        if (confirm("Are you sure you want to change the price of this product?") == true) {
            if (this.newProductPrice != null) {
                this.userService.updateProductPrice(this.stationProduct.id, this.newProductPrice).subscribe(
                    data => {
                        this.previousProductPrice = this.currentProductPrice;
                        this.currentProductPrice = data.price;
                        this.newProductPrice = 0;
                        this.alertService.success('Product Price Updated Successfully', true);
                        this.getAllStationProduct();
                    },
                    error => {
                        console.log(error);
                        this.alertService.error("Product Price Update Unsuccessful. Please Try Again or Contact Administrator");
                    });
            }
        }
    }

    updateMinLevel() {
        if (confirm("Are you sure you want to change the critical minimum level of this product?") == true) {
            if (this.newProductMinLevel != null) {
                this.userService.updateProductMinLevel(this.stationProduct.id, this.newProductMinLevel).subscribe(
                    data => {
                        this.previousProductMinLevel = this.currentProductMinLevel;
                        this.currentProductMinLevel = data.mininumLevel;
                        this.newProductMinLevel = 0;
                        this.alertService.success('Product Critical Minimum Level Updated Successfully', true);
                        this.getAllStationProduct();
                    },
                    error => {
                        console.log(error);
                        this.alertService.error("Product Critical Minimum Level Update Unsuccessful. Please Try Again or Contact Administrator");
                    });
            }
        }
    }

    updateProductLevel() {
        if (confirm("Are you sure you want to record a fresh product supply?") == true) {
            if (this.newProductSupply != null) {
                this.userService.updateProductLevel(this.stationProduct.id, this.newProductSupply).subscribe(
                    data => {
                        this.previousProductLevel = this.currentProductLevel;
                        this.currentProductLevel = data.newLevel;
                        this.newProductSupply = 0;
                        this.alertService.success('Product New Supply Updated Successfully', true);
                        this.getAllStationProduct();
                    },
                    error => {
                        console.log(error);
                        this.alertService.error("Product New Supply Update Unsuccessful. Please Try Again or Contact Administrator");
                    });
            }
        }
    }
}
