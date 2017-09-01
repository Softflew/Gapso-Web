import {Component, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/User';
import {Business} from '../model/Business';
import {UserService} from '../service/user.service';

@Component({
    moduleId: module.id,
    selector: 'heada',
    templateUrl: 'header.component.html'
})

export class HeaderComponent {
    user = new User();
    business = new Business();
    currentUrl: string;
    constructor(
        private userService: UserService,
        private router: Router,
        private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.business = JSON.parse(sessionStorage.getItem('business'));
        if (this.business != null) {
            this.getBusinessLogo();
        }
    }

    logout(): void {
        this.userService.logout();
        this.router.navigate(['login']);
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
                var img = this.elementRef.nativeElement.querySelector("#logo");
                img.src = blobUrl;
            },
            error => {
                console.log(error);
            });

    }

    navigationManager() {
        sessionStorage.removeItem('currentURL');
    }
}
