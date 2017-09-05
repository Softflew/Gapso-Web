import {Injectable} from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

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

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class GenericService {
    // URL to web api
    private baseURL = 'http://localhost:8080/Gapso-web/service/generic/';
    public businessManager = 'Business Manager';

    portalUser = new User();
    role = new PortalUserRole();
    business = new Business();
    station = new Station();
    dispAttendant = new DispensingPointAttendant();

    constructor(public http: Http, private router: Router, ) {}

    private sendNewUserEmailURL = this.baseURL + 'sendNewUserEmail';
    private loginURL = this.baseURL + 'login?';
    private validateLoginEmailURL = this.baseURL + 'validateLoginEmail?';
    private checkBusinessManagerValidityURL = this.baseURL + 'checkBusinessManagerValidity?';
    private checkAttendantValidityURL = this.baseURL + 'checkAttendantValidity?';
    private checkStationManagerValidityURL = this.baseURL + 'checkStationManagerValidity?';

    private jwt() {
        // create authorization header with jwt token
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});

    }

    sendNewUserEmail(user: User) {
        return this.http
            .post(this.sendNewUserEmailURL, JSON.stringify(user), this.jwt())
            .map((response: Response) => response.json());
    }

    login(emailAddress: string, password: string) {
        const url = `${this.loginURL}emailAddress=${emailAddress}&password=${password}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as User);
    }

    validateLoginEmail(emailAddress: string) {
        const url = `${this.validateLoginEmailURL}emailAddress=${emailAddress}`;
        return this.http.get(url)
            .map((response: Response) => response.json() as User);
    }

    continiousUserValidityCheck() {
        this.portalUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (this.portalUser != null) {
            this.role = JSON.parse(sessionStorage.getItem('role'));
            if (this.role.designation == 'BUSINESSMANAGER') {
                this.business = JSON.parse(sessionStorage.getItem('business'));
                const url = `${this.checkBusinessManagerValidityURL}userid=${this.portalUser.id}&businessId=${this.business.id}`;
                Observable.interval(5000)
                    .switchMap(() => this.http.get(url))
                    .map((data) => data.json())
                    .subscribe((data) => {
                        if (data == 'FALSE') {
                            this.logout();
                            this.router.navigate(['login']);
                        }
                    });
            }
            if (this.role.designation == 'ATTENDANT') {
                this.dispAttendant = JSON.parse(sessionStorage.getItem('dispensingPointAttendant'));
                const url = `${this.checkAttendantValidityURL}userid=${this.portalUser.id}&dispAttendantId=${this.dispAttendant.id}&roleId=${this.role.id}`;
                Observable.interval(5000)
                    .switchMap(() => this.http.get(url))
                    .map((data) => data.json())
                    .subscribe((data) => {
                        if (data == 'FALSE') {
                            this.logout();
                            this.router.navigate(['login']);
                        }
                    });
            }
            if (this.role.designation == 'STATIONMANAGER') {
                this.station = JSON.parse(sessionStorage.getItem('station'));
                const url = `${this.checkStationManagerValidityURL}userid=${this.portalUser.id}&stationId=${this.station.id}&roleId=${this.role.id}`;
                Observable.interval(5000)
                    .switchMap(() => this.http.get(url))
                    .map((data) => data.json())
                    .subscribe((data) => {
                        if (data == 'FALSE') {
                            this.logout();
                            this.router.navigate(['login']);
                        }
                    });
            }

        }
    }

    logout() {
        sessionStorage.clear();
    }
}
