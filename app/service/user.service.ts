import {Injectable} from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

import {User} from '../model/User';
import {Business} from '../model/Business';
import {Station} from '../model/Station';
import {Product} from '../model/Product';
import {PaymentOption} from '../model/PaymentOption';
import {StationPaymentOption} from '../model/StationPaymentOption';
import {PortalUserRole} from '../model/PortalUserRole';
import {StationProduct} from '../model/StationProduct';
import {StationProductPrice} from '../model/StationProductPrice';
import {StationProductMinLevel} from '../model/StationProductMinLevel';
import {ProductLevel} from '../model/ProductLevel';
import {ProductDispensingPoint} from '../model/ProductDispensingPoint';
import {DispensingPointAttendant} from '../model/DispensingPointAttendant';
import {DailySales} from '../model/DailySales';


@Injectable()
export class UserService {
    // URL to web api
    private baseURL = 'http://localhost:8080/Gapso-web/service/';
    private createStationURL = this.baseURL + 'createStation';
    private createProductURL = this.baseURL + 'createProduct';
    private createPaymentOptionURL = this.baseURL + 'createPaymentOption';
    private recordSalesURL = this.baseURL + 'recordSales';
    private getTodaySaleQuantityURL = this.baseURL + 'getTodaySaleQuantity?';
    private getTodaySaleAmountURL = this.baseURL + 'getTodaySaleAmount?';
    private getTodaySaleURL = this.baseURL + 'getTodaySale?';
    private createProductDispensingPointURL = this.baseURL + 'createProductDispensingPoint';
    private createDispensingPointAttendantURL = this.baseURL + 'createDispensingPointAttendant?';
    private updateProductDispensingPointURL = this.baseURL + 'updateProductDispensingPoint';
    private updateProductDispensingPointAttendantURL = this.baseURL + 'updateProductDispensingPointAttendant?';
    private createPortalUserURL = this.baseURL + 'createPortalUser?';
    private filterStationAttendantsURL = this.baseURL + 'filterStationAttendants?';
    private changePasswordURL = this.baseURL + 'changePassword?';
    private activateUserURL = this.baseURL + 'activateUser?';
    private deactivateUserURL = this.baseURL + 'deactivateUser?';
    private activateProductDispensingPointURL = this.baseURL + 'activateProductDispensingPoint?';
    private deactivateProductDispensingPointURL = this.baseURL + 'deactivateProductDispensingPoint?';
    private validateEmailURL = this.baseURL + 'validateEmail?';
    private getUserBusinessURL = this.baseURL + 'getUserBusiness?';
    private updateBusinessURL = this.baseURL + 'updateBusiness';
    private updateProductURL = this.baseURL + 'updateProduct';
    private updatePaymentOptionURL = this.baseURL + 'updatePaymentOption';
    private updateProductPriceURL = this.baseURL + 'updateProductPrice?';
    private updatePortalUserURL = this.baseURL + 'updatePortalUser';
    private updatePortalUserRoleURL = this.baseURL + 'updatePortalUserRole';
    private updateStationURL = this.baseURL + 'updateStation';
    private getBusinessStaffURL = this.baseURL + 'getBusinessStaff?';
    private getStationStaffURL = this.baseURL + 'getStationStaff?';
    private getBusinessStationURL = this.baseURL + 'getBusinessStation?';
    private getBusinessProductURL = this.baseURL + 'getBusinessProduct?';
    private getStationProductURL = this.baseURL + 'getStationProduct?';
    private getActiveBusinessStationURL = this.baseURL + 'getActiveBusinessStation?';
    private getBusinessLogoURL = this.baseURL + 'getBusinessLogo?';
    private getUnapprovedBusinessesURL = this.baseURL + 'getAllUnapprovedBusiness';
    private getAllBusinessURL = this.baseURL + 'getAllBusiness';
    private approveBusinessURL = this.baseURL + 'approveBusiness?';
    private declineBusinessURL = this.baseURL + 'declineBusiness?';
    private activateBusinessURL = this.baseURL + 'activateBusiness?';
    private deactivateBusinessURL = this.baseURL + 'deactivateBusiness?';
    private stationManagerCheckURL = this.baseURL + 'stationManagerCheck?';
    private createStationProductURL = this.baseURL + 'createStationProduct';
    private removeStationProductURL = this.baseURL + 'removeStationProduct';
    private createStationPaymentOptionURL = this.baseURL + 'createStationPaymentOption';
    private removeStationPaymentOptionURL = this.baseURL + 'removeStationPaymentOption';
    private getActiveStationProductPriceURL = this.baseURL + 'getActiveStationProductPrice?'
    private getStationProductPriceURL = this.baseURL + 'getStationProductPrice?'
    private getDispensingPointByStationURL = this.baseURL + 'getDispensingPointByStation?'
    private getActiveDispensingPointAttendantURL = this.baseURL + 'getActiveDispensingPointAttendant?';
    private getDispensingPointAttendantByActiveAttendantURL = this.baseURL + 'getDispensingPointAttendantByActiveAttendant?';
    private resetDispensingPointAttendantsURL = this.baseURL + 'resetDispensingPointAttendants?';
    private getActiveStationProductMinLevelURL = this.baseURL + 'getActiveStationProductMinLevel?';
    private updateProductMinLevelURL = this.baseURL + 'updateProductMinLevel?'
    private updateProductLevelURL = this.baseURL + 'updateProductLevel?'
    private getBusinessPaymentOptionURL = this.baseURL + 'getBusinessPaymentOption?'
    private getStationPaymentOptionURL = this.baseURL + 'getStationPaymentOption?';
    public getCurrentProductLevelURL = this.baseURL + 'getCurrentProductLevel?'
    private getDispensingPointByAttendantURL = this.baseURL + 'getDispensingPointByAttendant?';
    private getStationProductByStationAndProductURL = this.baseURL + 'getStationProductByStationAndProduct?'

    portalUser = new User();
    role = new PortalUserRole();
    business = new Business();
    station = new Station();
    dispAttendant = new DispensingPointAttendant();

    private headers = new Headers({'Content-Type': 'application/json'});

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error || error);
    }

    constructor(public http: Http, private router: Router, ) {}

    updateBusiness(business: Business) {
        return this.http
            .post(this.updateBusinessURL, JSON.stringify(business), this.jwt())
            .map((response: Response) => response.json() as Business);
    }

    updatePaymentOption(paymentOption: PaymentOption) {
        return this.http
            .post(this.updatePaymentOptionURL, JSON.stringify(paymentOption), this.jwt())
            .map((response: Response) => response.json() as PaymentOption);
    }

    updateProduct(product: Product) {
        return this.http
            .post(this.updateProductURL, JSON.stringify(product), this.jwt())
            .map((response: Response) => response.json() as Product);
    }

    //    ipAddress() {
    //        return this.http.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK')
    //            .map((response: Response) => response);
    //    }

    updateProductPrice(stationProductId: number, newPrice: number) {
        const url = `${this.updateProductPriceURL}stationProductId=${stationProductId}&newPrice=${newPrice}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as StationProductPrice);
    }

    updateProductMinLevel(stationProductId: number, newMinLevel: number) {
        const url = `${this.updateProductMinLevelURL}stationProductId=${stationProductId}&newMinLevel=${newMinLevel}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as StationProductMinLevel);
    }

    updateProductLevel(stationProductId: number, newProductSupply: number) {
        const url = `${this.updateProductLevelURL}stationProductId=${stationProductId}&newProductSupply=${newProductSupply}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as ProductLevel);
    }

    getCurrentProductLevel(stationProductId: number) {
        const url = `${this.getCurrentProductLevelURL}stationProductId=${stationProductId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as number);
    }

    updatePortalUser(user: User) {
        return this.http
            .post(this.updatePortalUserURL, JSON.stringify(user), this.jwt())
            .map((response: Response) => response.json() as User);
    }

    updatePortalUserRole(user: User) {
        return this.http
            .post(this.updatePortalUserRoleURL, JSON.stringify(user), this.jwt())
            .map((response: Response) => response.json() as User);
    }

    updateStation(station: Station) {
        return this.http
            .post(this.updateStationURL, JSON.stringify(station), this.jwt())
            .map((response: Response) => response.json() as Station);
    }

    createProduct(product: Product) {
        return this.http
            .post(this.createProductURL, JSON.stringify(product), this.jwt())
            .map((response: Response) => response.json());
    }

    createPaymentOption(paymentOption: PaymentOption) {
        return this.http
            .post(this.createPaymentOptionURL, JSON.stringify(paymentOption), this.jwt())
            .map((response: Response) => response.json() as PaymentOption);
    }

    recordSales(dailySales: DailySales) {
        return this.http
            .post(this.recordSalesURL, JSON.stringify(dailySales), this.jwt())
            .map((response: Response) => response.json() as DailySales);
    }

    createProductDispensingPoint(dispensingPoint: ProductDispensingPoint) {
        return this.http
            .post(this.createProductDispensingPointURL, JSON.stringify(dispensingPoint), this.jwt())
            .map((response: Response) => response.json() as ProductDispensingPoint);
    }

    createDispensingPointAttendant(attendantId: number, productDispensingPointId: number) {
        const url = `${this.createDispensingPointAttendantURL}attendantId=${attendantId}&productDispensingPointId=${productDispensingPointId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as DispensingPointAttendant);
    }

    getTodaySaleAmount(attendantId: number) {
        const url = `${this.getTodaySaleAmountURL}attendantId=${attendantId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as Number);
    }

    getTodaySaleQuantity(attendantId: number) {
        const url = `${this.getTodaySaleQuantityURL}attendantId=${attendantId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as Number);
    }

    getTodaySale(attendantId: number) {
        const url = `${this.getTodaySaleURL}attendantId=${attendantId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as DailySales[]);
    }

    updateProductDispensingPoint(dispensingPoint: ProductDispensingPoint) {
        return this.http
            .post(this.updateProductDispensingPointURL, JSON.stringify(dispensingPoint), this.jwt())
            .map((response: Response) => response.json() as ProductDispensingPoint);
    }

    updateProductDispensingPointAttendant(attendantId: number, dispensingPointId: number) {
        const url = `${this.updateProductDispensingPointAttendantURL}attendantId=${attendantId}&dispensingPointId=${dispensingPointId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as DispensingPointAttendant);
    }

    createStation(station: Station) {
        return this.http
            .post(this.createStationURL, JSON.stringify(station), this.jwt())
            .map((response: Response) => response.json() as Station);
    }


    createPortalUser(user: User) {
        return this.http
            .post(this.createPortalUserURL, JSON.stringify(user), this.jwt())
            .map((response: Response) => response.json() as User);
    }

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

    filterStationAttendants(stationId: number) {
        const url = `${this.filterStationAttendantsURL}stationId=${stationId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as User[]);
    }

    validateEmail(emailAddress: string) {
        const url = `${this.validateEmailURL}emailAddress=${emailAddress}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as User);
    }

    changePassword(userid: number, password: string) {
        const url = `${this.changePasswordURL}userid=${userid}&password=${password}`;
        return this.http.get(url)
            .map((response: Response) => response.ok);
    }

    activateUser(portalUserId: number) {
        const url = `${this.activateUserURL}portalUserId=${portalUserId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as User);
    }

    deactivateUser(portalUserId: number) {
        const url = `${this.deactivateUserURL}portalUserId=${portalUserId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as User);
    }

    activateProductDispensingPoint(pdpId: number) {
        const url = `${this.activateProductDispensingPointURL}pdpId=${pdpId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as ProductDispensingPoint);
    }

    deactivateProductDispensingPoint(pdpId: number) {
        const url = `${this.deactivateProductDispensingPointURL}pdpId=${pdpId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as ProductDispensingPoint);
    }

    createStationProduct(stationProductIds: Number[]) {
        return this.http
            .post(this.createStationProductURL, JSON.stringify(stationProductIds), this.jwt())
            .map((response: Response) => response.json());
    }

    removeStationProduct(stationProductIds: Number[]) {
        return this.http
            .post(this.removeStationProductURL, JSON.stringify(stationProductIds), this.jwt())
            .map((response: Response) => response.json());
    }

    createStationPaymentOption(stationPaymentOptionIds: Number[]) {
        return this.http
            .post(this.createStationPaymentOptionURL, JSON.stringify(stationPaymentOptionIds), this.jwt())
            .map((response: Response) => response.json());
    }

    removeStationPaymentOption(stationPaymentOptionIds: Number[]) {
        return this.http
            .post(this.removeStationPaymentOptionURL, JSON.stringify(stationPaymentOptionIds), this.jwt())
            .map((response: Response) => response.json());
    }

    getUserBusiness(userId: number) {
        const url = `${this.getUserBusinessURL}userId=${userId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as Business);
    }

    getBusinessLogo(businessId: number) {
        const url = `${this.getBusinessLogoURL}businessId=${businessId}`;
        return this.http.get(url)
            .map((response: Response) => response.text());
    }


    approveBusiness(businessId: number) {
        const url = `${this.approveBusinessURL}businessId=${businessId}`;
        return this.http.get(url)
            .map((response: Response) => response.json());
    }

    declineBusiness(businessId: number) {
        const url = `${this.declineBusinessURL}businessId=${businessId}`;
        return this.http.get(url)
            .map((response: Response) => response.json());
    }

    activateBusiness(businessId: number) {
        const url = `${this.activateBusinessURL}businessId=${businessId}`;
        return this.http.get(url)
            .map((response: Response) => response.json());
    }

    deactivateBusiness(businessId: number) {
        const url = `${this.deactivateBusinessURL}businessId=${businessId}`;
        return this.http.get(url)
            .map((response: Response) => response.json());
    }

    getAllUnapprovedBusiness() {
        return this.http.get(this.getUnapprovedBusinessesURL)
            .map((response: Response) => response.json() as Business[]);
    }

    getAllBusiness() {
        return this.http.get(this.getAllBusinessURL)
            .map((response: Response) => response.json() as Business[]);
    }

    getBusinessStaff(businessId: number) {
        const url = `${this.getBusinessStaffURL}businessId=${businessId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as User[]);
    }

    getStationStaff(stationId: number) {
        const url = `${this.getStationStaffURL}stationId=${stationId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as User[]);
    }

    getBusinessProduct(businessId: number) {
        const url = `${this.getBusinessProductURL}businessId=${businessId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as Product[]);
    }

    getBusinessPaymentOption(businessId: number) {
        const url = `${this.getBusinessPaymentOptionURL}businessId=${businessId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as PaymentOption[]);
    }

    getActiveStationProductPrice(stationProductId: number) {
        const url = `${this.getActiveStationProductPriceURL}stationProductId=${stationProductId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as StationProductPrice);
    }

    getActiveStationProductMinLevel(stationProductId: number) {
        const url = `${this.getActiveStationProductMinLevelURL}stationProductId=${stationProductId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as StationProductMinLevel);
    }

    getActiveDispensingPointAttendant(dispensingPointId: number) {
        const url = `${this.getActiveDispensingPointAttendantURL}dispensingPointId=${dispensingPointId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as User);
    }

    getDispensingPointAttendantByActiveAttendant(userid: number) {
        const url = `${this.getDispensingPointAttendantByActiveAttendantURL}userid=${userid}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as DispensingPointAttendant);
    }

    getDispensingPointByAttendant(dispointAttendantId: number) {
        const url = `${this.getDispensingPointByAttendantURL}dispointAttendantId=${dispointAttendantId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as ProductDispensingPoint);
    }

    getStationProductPrice(stationId: number) {
        const url = `${this.getStationProductPriceURL}stationId=${stationId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as StationProductPrice[]);
    }

    getDispensingPointByStation(stationId: number) {
        const url = `${this.getDispensingPointByStationURL}stationId=${stationId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as ProductDispensingPoint[]);
    }

    resetDispensingPointAttendants(stationId: number) {
        const url = `${this.resetDispensingPointAttendantsURL}stationId=${stationId}`;
        return this.http.get(url)
            .map((response: Response) => response.ok);
    }

    getStationProduct(stationId: number) {
        const url = `${this.getStationProductURL}stationId=${stationId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as StationProduct[]);
    }

    getStationPaymentOption(stationId: number) {
        const url = `${this.getStationPaymentOptionURL}stationId=${stationId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as StationPaymentOption[]);
    }

    getStationProductByStationAndProduct(stationId: number, productId: number) {
        const url = `${this.getStationProductByStationAndProductURL}stationId=${stationId}&productId=${productId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as StationProduct);
    }

    getBusinessStation(businessId: number) {
        const url = `${this.getBusinessStationURL}businessId=${businessId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as Station[]);
    }

    getActiveBusinessStation(businessId: number) {
        const url = `${this.getActiveBusinessStationURL}businessId=${businessId}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as Station[]);
    }

    stationManagerCheck(stationId: number) {
        const url = `${this.stationManagerCheckURL}stationId=${stationId}`;
        return this.http.get(url)
            .map((response: Response) => response.json())
    }

    logout() {
        sessionStorage.clear();
    }

    private jwt() {
        // create authorization header with jwt token
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});

    }

    //    getHero(id: number): Promise<Hero> {
    //        const url = `${this.heroesUrl}/${id}`;
    //        return this.http.get(url)
    //            .toPromise()
    //            .then(response => response.json().data as Hero)
    //            .catch(this.handleError);
    //    }



    //    getHeroes(): Promise<Hero[]> {
    //        return this.http.get(this.heroesUrl)
    //            .toPromise()
    //            .then(response => response.json().data as Hero[])
    //            .catch(this.handleError);
    //    }



    //    update(hero: Hero): Promise<Hero> {
    //        const url = `${this.heroesUrl}/${hero.id}`;
    //        return this.http
    //            .put(url, JSON.stringify(hero), {headers: this.headers})
    //            .toPromise()
    //            .then(() => hero)
    //            .catch(this.handleError);
    //    }



    //    loadGender() {
    //        return this.http.get(this.loadGenderUrl).map((response: Response) => response.json());
    //    }

    //    loadAllUsers() {
    //        return this.http.get(this.loadAllUsersUrl).map((response: Response) => response.json());
    //    }

    //        loadAllUsers(): Observable<User[]> {
    //            return this.http
    //                .get(this.loadAllUsersUrl)
    //                .map((r: Response) => r.json().data as User[]);
    //        }

    //        loadAllUsers(): Promise<User[]> {
    //            return this.http.get(this.loadAllUsersUrl)
    //                .toPromise()
    //                .then(response => response.json() as User[])
    //                .catch(this.handleError);
    //        }



    //    delete(id: number): Promise<void> {
    //        const url = `${this.heroesUrl}/${id}`;
    //        return this.http.delete(url, {headers: this.headers})
    //            .toPromise()
    //            .then(() => null)
    //            .catch(this.handleError);
    //    }


}
