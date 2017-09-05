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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
require('rxjs/add/operator/toPromise');
require('rxjs/Rx');
var User_1 = require('../model/User');
var Business_1 = require('../model/Business');
var Station_1 = require('../model/Station');
var PortalUserRole_1 = require('../model/PortalUserRole');
var DispensingPointAttendant_1 = require('../model/DispensingPointAttendant');
var UserService = (function () {
    function UserService(http, router) {
        this.http = http;
        this.router = router;
        // URL to web api
        this.baseURL = 'http://localhost:8080/Gapso-web/service/';
        this.createStationURL = this.baseURL + 'createStation';
        this.createProductURL = this.baseURL + 'createProduct';
        this.createPaymentOptionURL = this.baseURL + 'createPaymentOption';
        this.recordSalesURL = this.baseURL + 'recordSales';
        this.getTodaySaleQuantityURL = this.baseURL + 'getTodaySaleQuantity?';
        this.getTodaySaleAmountURL = this.baseURL + 'getTodaySaleAmount?';
        this.getTodaySaleURL = this.baseURL + 'getTodaySale?';
        this.createProductDispensingPointURL = this.baseURL + 'createProductDispensingPoint';
        this.createDispensingPointAttendantURL = this.baseURL + 'createDispensingPointAttendant?';
        this.updateProductDispensingPointURL = this.baseURL + 'updateProductDispensingPoint';
        this.updateProductDispensingPointAttendantURL = this.baseURL + 'updateProductDispensingPointAttendant?';
        this.createPortalUserURL = this.baseURL + 'createPortalUser?';
        this.filterStationAttendantsURL = this.baseURL + 'filterStationAttendants?';
        this.changePasswordURL = this.baseURL + 'changePassword?';
        this.activateUserURL = this.baseURL + 'activateUser?';
        this.deactivateUserURL = this.baseURL + 'deactivateUser?';
        this.activateProductDispensingPointURL = this.baseURL + 'activateProductDispensingPoint?';
        this.deactivateProductDispensingPointURL = this.baseURL + 'deactivateProductDispensingPoint?';
        this.validateEmailURL = this.baseURL + 'validateEmail?';
        this.getUserBusinessURL = this.baseURL + 'getUserBusiness?';
        this.updateBusinessURL = this.baseURL + 'updateBusiness';
        this.updateProductURL = this.baseURL + 'updateProduct';
        this.updatePaymentOptionURL = this.baseURL + 'updatePaymentOption';
        this.updateProductPriceURL = this.baseURL + 'updateProductPrice?';
        this.updatePortalUserURL = this.baseURL + 'updatePortalUser';
        this.updatePortalUserRoleURL = this.baseURL + 'updatePortalUserRole';
        this.updateStationURL = this.baseURL + 'updateStation';
        this.getBusinessStaffURL = this.baseURL + 'getBusinessStaff?';
        this.getStationStaffURL = this.baseURL + 'getStationStaff?';
        this.getBusinessStationURL = this.baseURL + 'getBusinessStation?';
        this.getBusinessProductURL = this.baseURL + 'getBusinessProduct?';
        this.getStationProductURL = this.baseURL + 'getStationProduct?';
        this.getActiveBusinessStationURL = this.baseURL + 'getActiveBusinessStation?';
        this.getBusinessLogoURL = this.baseURL + 'getBusinessLogo?';
        this.getUnapprovedBusinessesURL = this.baseURL + 'getAllUnapprovedBusiness';
        this.getAllBusinessURL = this.baseURL + 'getAllBusiness';
        this.approveBusinessURL = this.baseURL + 'approveBusiness?';
        this.declineBusinessURL = this.baseURL + 'declineBusiness?';
        this.activateBusinessURL = this.baseURL + 'activateBusiness?';
        this.deactivateBusinessURL = this.baseURL + 'deactivateBusiness?';
        this.stationManagerCheckURL = this.baseURL + 'stationManagerCheck?';
        this.createStationProductURL = this.baseURL + 'createStationProduct';
        this.removeStationProductURL = this.baseURL + 'removeStationProduct';
        this.createStationPaymentOptionURL = this.baseURL + 'createStationPaymentOption';
        this.removeStationPaymentOptionURL = this.baseURL + 'removeStationPaymentOption';
        this.getActiveStationProductPriceURL = this.baseURL + 'getActiveStationProductPrice?';
        this.getStationProductPriceURL = this.baseURL + 'getStationProductPrice?';
        this.getDispensingPointByStationURL = this.baseURL + 'getDispensingPointByStation?';
        this.getActiveDispensingPointAttendantURL = this.baseURL + 'getActiveDispensingPointAttendant?';
        this.getDispensingPointAttendantByActiveAttendantURL = this.baseURL + 'getDispensingPointAttendantByActiveAttendant?';
        this.resetDispensingPointAttendantsURL = this.baseURL + 'resetDispensingPointAttendants?';
        this.getActiveStationProductMinLevelURL = this.baseURL + 'getActiveStationProductMinLevel?';
        this.updateProductMinLevelURL = this.baseURL + 'updateProductMinLevel?';
        this.updateProductLevelURL = this.baseURL + 'updateProductLevel?';
        this.getBusinessPaymentOptionURL = this.baseURL + 'getBusinessPaymentOption?';
        this.getStationPaymentOptionURL = this.baseURL + 'getStationPaymentOption?';
        this.getCurrentProductLevelURL = this.baseURL + 'getCurrentProductLevel?';
        this.getDispensingPointByAttendantURL = this.baseURL + 'getDispensingPointByAttendant?';
        this.getStationProductByStationAndProductURL = this.baseURL + 'getStationProductByStationAndProduct?';
        this.portalUser = new User_1.User();
        this.role = new PortalUserRole_1.PortalUserRole();
        this.business = new Business_1.Business();
        this.station = new Station_1.Station();
        this.dispAttendant = new DispensingPointAttendant_1.DispensingPointAttendant();
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    UserService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error || error);
    };
    UserService.prototype.updateBusiness = function (business) {
        return this.http
            .post(this.updateBusinessURL, JSON.stringify(business), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.updatePaymentOption = function (paymentOption) {
        return this.http
            .post(this.updatePaymentOptionURL, JSON.stringify(paymentOption), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.updateProduct = function (product) {
        return this.http
            .post(this.updateProductURL, JSON.stringify(product), this.jwt())
            .map(function (response) { return response.json(); });
    };
    //    ipAddress() {
    //        return this.http.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK')
    //            .map((response: Response) => response);
    //    }
    UserService.prototype.updateProductPrice = function (stationProductId, newPrice) {
        var url = this.updateProductPriceURL + "stationProductId=" + stationProductId + "&newPrice=" + newPrice;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.updateProductMinLevel = function (stationProductId, newMinLevel) {
        var url = this.updateProductMinLevelURL + "stationProductId=" + stationProductId + "&newMinLevel=" + newMinLevel;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.updateProductLevel = function (stationProductId, newProductSupply) {
        var url = this.updateProductLevelURL + "stationProductId=" + stationProductId + "&newProductSupply=" + newProductSupply;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getCurrentProductLevel = function (stationProductId) {
        var url = this.getCurrentProductLevelURL + "stationProductId=" + stationProductId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.updatePortalUser = function (user) {
        return this.http
            .post(this.updatePortalUserURL, JSON.stringify(user), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.updatePortalUserRole = function (user) {
        return this.http
            .post(this.updatePortalUserRoleURL, JSON.stringify(user), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.updateStation = function (station) {
        return this.http
            .post(this.updateStationURL, JSON.stringify(station), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.createProduct = function (product) {
        return this.http
            .post(this.createProductURL, JSON.stringify(product), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.createPaymentOption = function (paymentOption) {
        return this.http
            .post(this.createPaymentOptionURL, JSON.stringify(paymentOption), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.recordSales = function (dailySales) {
        return this.http
            .post(this.recordSalesURL, JSON.stringify(dailySales), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.createProductDispensingPoint = function (dispensingPoint) {
        return this.http
            .post(this.createProductDispensingPointURL, JSON.stringify(dispensingPoint), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.createDispensingPointAttendant = function (attendantId, productDispensingPointId) {
        var url = this.createDispensingPointAttendantURL + "attendantId=" + attendantId + "&productDispensingPointId=" + productDispensingPointId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getTodaySaleAmount = function (attendantId) {
        var url = this.getTodaySaleAmountURL + "attendantId=" + attendantId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getTodaySaleQuantity = function (attendantId) {
        var url = this.getTodaySaleQuantityURL + "attendantId=" + attendantId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getTodaySale = function (attendantId) {
        var url = this.getTodaySaleURL + "attendantId=" + attendantId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.updateProductDispensingPoint = function (dispensingPoint) {
        return this.http
            .post(this.updateProductDispensingPointURL, JSON.stringify(dispensingPoint), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.updateProductDispensingPointAttendant = function (attendantId, dispensingPointId) {
        var url = this.updateProductDispensingPointAttendantURL + "attendantId=" + attendantId + "&dispensingPointId=" + dispensingPointId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.createStation = function (station) {
        return this.http
            .post(this.createStationURL, JSON.stringify(station), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.createPortalUser = function (user) {
        return this.http
            .post(this.createPortalUserURL, JSON.stringify(user), this.jwt())
            .map(function (response) { return response.json(); });
    };
    //    create(registerUser: RegisterUser): Promise<any    > {
    //        return this.h    ttp
    //            .post(this.createUserURL, JSON.stringify(registerUser), {headers: this.header    s})
    //            .toPromis    e()
    //            .then(res => res.    ok)
    //            .catch(this.handleErro    r);
    //        }
    //    login(phoneNumber: string, password: string): Promise<User    > {
    //        const url = `${this.loginURL}phoneNumber=${phoneNumber}&password=${password    }`;
    //        return this.http.get(u    rl)
    //            .toPromis    e()
    //            .then(response => response.json    ())
    //            .catch(this.handleErro    r);
    //    }
    UserService.prototype.filterStationAttendants = function (stationId) {
        var url = this.filterStationAttendantsURL + "stationId=" + stationId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.validateEmail = function (emailAddress) {
        var url = this.validateEmailURL + "emailAddress=" + emailAddress;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.changePassword = function (userid, password) {
        var url = this.changePasswordURL + "userid=" + userid + "&password=" + password;
        return this.http.get(url)
            .map(function (response) { return response.ok; });
    };
    UserService.prototype.activateUser = function (portalUserId) {
        var url = this.activateUserURL + "portalUserId=" + portalUserId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.deactivateUser = function (portalUserId) {
        var url = this.deactivateUserURL + "portalUserId=" + portalUserId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.activateProductDispensingPoint = function (pdpId) {
        var url = this.activateProductDispensingPointURL + "pdpId=" + pdpId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.deactivateProductDispensingPoint = function (pdpId) {
        var url = this.deactivateProductDispensingPointURL + "pdpId=" + pdpId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.createStationProduct = function (stationProductIds) {
        return this.http
            .post(this.createStationProductURL, JSON.stringify(stationProductIds), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.removeStationProduct = function (stationProductIds) {
        return this.http
            .post(this.removeStationProductURL, JSON.stringify(stationProductIds), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.createStationPaymentOption = function (stationPaymentOptionIds) {
        return this.http
            .post(this.createStationPaymentOptionURL, JSON.stringify(stationPaymentOptionIds), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.removeStationPaymentOption = function (stationPaymentOptionIds) {
        return this.http
            .post(this.removeStationPaymentOptionURL, JSON.stringify(stationPaymentOptionIds), this.jwt())
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getUserBusiness = function (userId) {
        var url = this.getUserBusinessURL + "userId=" + userId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getBusinessLogo = function (businessId) {
        var url = this.getBusinessLogoURL + "businessId=" + businessId;
        return this.http.get(url)
            .map(function (response) { return response.text(); });
    };
    UserService.prototype.approveBusiness = function (businessId) {
        var url = this.approveBusinessURL + "businessId=" + businessId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.declineBusiness = function (businessId) {
        var url = this.declineBusinessURL + "businessId=" + businessId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.activateBusiness = function (businessId) {
        var url = this.activateBusinessURL + "businessId=" + businessId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.deactivateBusiness = function (businessId) {
        var url = this.deactivateBusinessURL + "businessId=" + businessId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getAllUnapprovedBusiness = function () {
        return this.http.get(this.getUnapprovedBusinessesURL)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getAllBusiness = function () {
        return this.http.get(this.getAllBusinessURL)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getBusinessStaff = function (businessId) {
        var url = this.getBusinessStaffURL + "businessId=" + businessId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getStationStaff = function (stationId) {
        var url = this.getStationStaffURL + "stationId=" + stationId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getBusinessProduct = function (businessId) {
        var url = this.getBusinessProductURL + "businessId=" + businessId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getBusinessPaymentOption = function (businessId) {
        var url = this.getBusinessPaymentOptionURL + "businessId=" + businessId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getActiveStationProductPrice = function (stationProductId) {
        var url = this.getActiveStationProductPriceURL + "stationProductId=" + stationProductId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getActiveStationProductMinLevel = function (stationProductId) {
        var url = this.getActiveStationProductMinLevelURL + "stationProductId=" + stationProductId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getActiveDispensingPointAttendant = function (dispensingPointId) {
        var url = this.getActiveDispensingPointAttendantURL + "dispensingPointId=" + dispensingPointId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getDispensingPointAttendantByActiveAttendant = function (userid) {
        var url = this.getDispensingPointAttendantByActiveAttendantURL + "userid=" + userid;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getDispensingPointByAttendant = function (dispointAttendantId) {
        var url = this.getDispensingPointByAttendantURL + "dispointAttendantId=" + dispointAttendantId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getStationProductPrice = function (stationId) {
        var url = this.getStationProductPriceURL + "stationId=" + stationId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getDispensingPointByStation = function (stationId) {
        var url = this.getDispensingPointByStationURL + "stationId=" + stationId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.resetDispensingPointAttendants = function (stationId) {
        var url = this.resetDispensingPointAttendantsURL + "stationId=" + stationId;
        return this.http.get(url)
            .map(function (response) { return response.ok; });
    };
    UserService.prototype.getStationProduct = function (stationId) {
        var url = this.getStationProductURL + "stationId=" + stationId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getStationPaymentOption = function (stationId) {
        var url = this.getStationPaymentOptionURL + "stationId=" + stationId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getStationProductByStationAndProduct = function (stationId, productId) {
        var url = this.getStationProductByStationAndProductURL + "stationId=" + stationId + "&productId=" + productId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getBusinessStation = function (businessId) {
        var url = this.getBusinessStationURL + "businessId=" + businessId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getActiveBusinessStation = function (businessId) {
        var url = this.getActiveBusinessStationURL + "businessId=" + businessId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.stationManagerCheck = function (stationId) {
        var url = this.stationManagerCheckURL + "stationId=" + stationId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.logout = function () {
        sessionStorage.clear();
    };
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return new http_1.RequestOptions({ headers: headers });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map