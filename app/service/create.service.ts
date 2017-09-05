import {Injectable} from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';

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
export class CreateService {
    // URL to web api
    private baseURL = 'http://localhost:8080/Gapso-web/service/create/';

    private createUserURL = this.baseURL + 'createPortalUser';
    private createBusinessURL = this.baseURL + 'createBusiness';
    private createPortalUserRoleURL = this.baseURL + 'createPortalUserRole';

    constructor(public http: Http) {}

    createUser(user: User) {
        return this.http
            .post(this.createUserURL, JSON.stringify(user), this.jwt())
            .map((response: Response) => response.json() as User);
    }

    createBusiness(business: Business) {
        return this.http
            .post(this.createBusinessURL, JSON.stringify(business), this.jwt())
            .map((response: Response) => response.json() as Business);
    }

    createPortalUserRole(pur: PortalUserRole) {
        return this.http
            .post(this.createPortalUserRoleURL, JSON.stringify(pur), this.jwt())
            .map((response: Response) => response.json() as PortalUserRole);
    }

    private jwt() {
        // create authorization header with jwt token
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});

    }
}
