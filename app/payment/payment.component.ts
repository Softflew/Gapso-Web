import {Component, ElementRef} from '@angular/core';
import {User} from '../model/User';
import {Business} from '../model/Business';
import {PaymentOption} from '../model/PaymentOption';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';

@Component({
    moduleId: module.id,
    selector: 'payment',
    templateUrl: 'payment.component.html'
})

export class PaymentComponent {

    user = new User();
    portalUser = new User();
    business = new Business();
    paymentoptions: PaymentOption[];
    paymentoption = new PaymentOption();
    editPaymentOption = new PaymentOption();

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
        this.getAllBusinessPaymentOption();
    }

    createPaymentOption() {
        if (this.paymentoption.name == null || this.paymentoption.name == "") {
        } else {
            this.paymentoption.setBusiness(this.business);
            this.userService.createPaymentOption(this.paymentoption).subscribe(
                data => {
                    this.alertService.success('PaymentOption Created Successfully', false);
                    this.paymentoption = new PaymentOption();
                    this.getAllBusinessPaymentOption();
                },
                error => {
                    console.log(error);
                    this.alertService.error("PaymentOption Creation Unsuccessful. Please Try Again or Contact Administrator");
                });
        }
    }

    updatePaymentOption() {
        if (this.editPaymentOption.name == null || this.editPaymentOption.name == "") {
        } else {
            this.userService.updatePaymentOption(this.editPaymentOption).subscribe(
                data => {
                    this.alertService.success('Payment Option Updated Successfully', true);
                    this.getAllBusinessPaymentOption();
                },
                error => {
                    console.log(error);
                    this.alertService.error("Payment Option Update Unsuccessful. Please Try Again or Contact Administrator");
                });
        }
    }

    openPaymentOptionEdit(currentPaymentOption: PaymentOption) {
        this.editPaymentOption = currentPaymentOption;
        var modalAnchor = this.elementRef.nativeElement.querySelector("#modalAnchor");
        modalAnchor.click();
    }

    getAllBusinessPaymentOption() {
        this.userService.getBusinessPaymentOption(this.business.id).subscribe(
            data => {
                this.paymentoptions = data;
            },
            error => {
                console.log(error);
            });
    }

}
