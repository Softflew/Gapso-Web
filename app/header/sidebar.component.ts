import {Component, ElementRef} from '@angular/core';
import {PortalUserRole} from '../model/PortalUserRole';
import {ProductDispensingPoint} from '../model/ProductDispensingPoint';

@Component({
    moduleId: module.id,
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html'
})

export class SideBarComponent {
    role = new PortalUserRole();
    productDispensingPoint = new ProductDispensingPoint();
    designation: string;
    currentUrl: string;
    pumpName: string;
    constructor(private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        this.role = JSON.parse(sessionStorage.getItem('role'));
        this.productDispensingPoint = JSON.parse(sessionStorage.getItem('dispensingPoint'));

        var businessManagerMenu = document.getElementById("businessManagerMenu");
        businessManagerMenu.hidden = true;

        var stationManagerMenu = document.getElementById("stationManagerMenu");
        stationManagerMenu.hidden = true;
        
        var superAdminMenu = document.getElementById("superAdminMenu");
        superAdminMenu.hidden = true;

        if (this.role.designation == 'BUSINESSMANAGER') {
            this.designation = 'Business Manager';
            businessManagerMenu.hidden = false;
        }
        if (this.role.designation == 'STATIONMANAGER') {
            this.designation = 'Station Manager';
            stationManagerMenu.hidden = false;
        }
        if (this.role.designation == 'ATTENDANT') {
            this.designation = 'Sales Attendant';
        }
        
        if (this.role.designation == 'SUPERADMIN') {
            this.designation = 'Super Admin';
             superAdminMenu.hidden = false;
        }

        this.setCurrentURL();

    }

    setCurrentURL() {
        this.currentUrl = JSON.parse(sessionStorage.getItem('currentURL'));
        if (this.currentUrl != null) {
            var element = this.elementRef.nativeElement.querySelector("#" + this.currentUrl);
            element.classList.add('active');
        }
    }


    navigationManager(navPage: string) {
        this.currentUrl = JSON.parse(sessionStorage.getItem('currentURL'));
        var element = this.elementRef.nativeElement.querySelector("#" + this.currentUrl);
        if (element != null) {
            element.classList.remove('active');
        }
        sessionStorage.setItem('currentURL', JSON.stringify(navPage));
    }


}
