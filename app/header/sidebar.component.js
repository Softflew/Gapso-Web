"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var PortalUserRole_1 = require('../model/PortalUserRole');
var ProductDispensingPoint_1 = require('../model/ProductDispensingPoint');
var SideBarComponent = (function () {
    function SideBarComponent(elementRef) {
        this.elementRef = elementRef;
        this.role = new PortalUserRole_1.PortalUserRole();
        this.productDispensingPoint = new ProductDispensingPoint_1.ProductDispensingPoint();
    }
    SideBarComponent.prototype.ngOnInit = function () {
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
    };
    SideBarComponent.prototype.setCurrentURL = function () {
        this.currentUrl = JSON.parse(sessionStorage.getItem('currentURL'));
        if (this.currentUrl != null) {
            var element = this.elementRef.nativeElement.querySelector("#" + this.currentUrl);
            element.classList.add('active');
        }
    };
    SideBarComponent.prototype.navigationManager = function (navPage) {
        this.currentUrl = JSON.parse(sessionStorage.getItem('currentURL'));
        var element = this.elementRef.nativeElement.querySelector("#" + this.currentUrl);
        if (element != null) {
            element.classList.remove('active');
        }
        sessionStorage.setItem('currentURL', JSON.stringify(navPage));
    };
    SideBarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sidebar',
            templateUrl: 'sidebar.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], SideBarComponent);
    return SideBarComponent;
}());
exports.SideBarComponent = SideBarComponent;
//# sourceMappingURL=sidebar.component.js.map