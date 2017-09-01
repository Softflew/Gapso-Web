import {Component, ElementRef} from '@angular/core';
import {User} from '../model/User';
import {Business} from '../model/Business';
import {Product} from '../model/Product';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';

@Component({
    moduleId: module.id,
    selector: 'product',
    templateUrl: 'product.component.html'
})

export class ProductComponent {

    user = new User();
    portalUser = new User();
    business = new Business();
    products: Product[];
    product = new Product();
    editProduct = new Product();

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);

        this.business = JSON.parse(sessionStorage.getItem('business'));
        this.getAllBusinessProduct();
    }

    createProduct() {
        if (this.product.name == null || this.product.name == "" ||
            this.product.productCode == null || this.product.productCode == "" ||
            this.product.unit == null || this.product.unit == "") {
        } else {
            this.product.setBusiness(this.business);
            this.userService.createProduct(this.product).subscribe(
                data => {
                    this.alertService.success('Product Created Successfully', false);
                    this.product = new Product();
                    this.getAllBusinessProduct();
                },
                error => {
                    console.log(error);
                    this.alertService.error("Product Creation Unsuccessful. Please Try Again or Contact Administrator");
                });
        }
    }

    updateProduct() {
        if (this.editProduct.name == null || this.editProduct.name == "" ||
            this.editProduct.productCode == null || this.editProduct.productCode == "" ||
            this.editProduct.unit == null || this.editProduct.unit == "") {
        } else {
            this.userService.updateProduct(this.editProduct).subscribe(
                data => {
                    this.alertService.success('Product Updated Successfully', true);
                    this.getAllBusinessProduct();
                    //                    var modal = this.elementRef.nativeElement.querySelector("#modal-dialog").querySelector("#closeModal");
                    //                    modal.click();
                },
                error => {
                    console.log(error);
                    this.alertService.error("Product Update Unsuccessful. Please Try Again or Contact Administrator");
                });
        }
    }

    openEdit(currentProduct: Product) {
        this.editProduct = currentProduct;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalAnchor");
        modalAnchor.click();
    }

    getAllBusinessProduct() {
        this.userService.getBusinessProduct(this.business.id).subscribe(
            data => {
                this.products = data;
            },
            error => {
                console.log(error);
            });
    }

}
