import {Component, OnInit, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/User';
import {Business} from '../model/Business';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';

@Component({
    moduleId: module.id,
    selector: 'business',
    templateUrl: 'business.component.html'
})

export class BusinessComponent implements OnInit {
    user = new User();
    business = new Business();

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private router: Router,
        private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.business = JSON.parse(sessionStorage.getItem('business'));
        this.getBusinessLogo();

        var s1 = document.createElement("script");
        s1.src = 'app/assets/plugins/parsley/dist/parsley.js';
        this.elementRef.nativeElement.appendChild(s1);
    }


    updateBusiness() {
        if (this.business.name == null || this.business.name == "") {
        } else {
            this.userService.updateBusiness(this.business).subscribe(
                data => {
                    this.alertService.success('Business Updated Successfully', true);
                    sessionStorage.setItem('business', JSON.stringify(data))
                    this.router.navigate(['business']);
                },
                error => {
                    console.log(error);
                    this.alertService.error("Business Update Unsuccessful. Please Try Again or Contact Administrator");
                });
        }
    }

    public imageUploaded(e: any): void {
        console.log("e is " + e)
        //        var modal = this.elementRef.nativeElement.querySelector("#modal-dialog").querySelector("#closeModal");
        //        modal.click();
        //        location.reload();
    }

    public disableSendButton(e: any): void {
    }

    public imageRemoved(e: any): void {
    }

    getBusinessLogo() {
        this.userService.getBusinessLogo(this.business.id).subscribe(
            data => {
                var byteCharacters = atob(data);
                var byteArrays = [];

                for (var offset = 0; offset < byteCharacters.length; offset += 512) {
                    var slice = byteCharacters.slice(offset, offset + 512);
                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
                    var byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }
                var blob = new Blob(byteArrays, {type: 'image/png'});
                var blobUrl = URL.createObjectURL(blob);
                var img = this.elementRef.nativeElement.querySelector("#logo2");
                img.src = blobUrl;
            },
            error => {
                console.log(error);
            });

    }


}
