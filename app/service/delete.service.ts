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
export class DeleteService {
    // URL to web api
    private baseURL = 'http://localhost:8080/Gapso-web/service/delete/';

    private deleteUserURL = this.baseURL + 'delete/deletePortalUser';
    private deleteBusinessURL = this.baseURL + 'delete/deleteBusiness';
    private deletePortalUserRoleURL = this.baseURL + 'delete/deletePortalUserRole';

    constructor(public http: Http) {}

    private jwt() {
        // create authorization header with jwt token
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});

    }

    deleteUser(user: User) {
        return this.http
            .post(this.deleteUserURL, JSON.stringify(user), this.jwt())
            .map((response: Response) => response.json() as User);
    }

    deleteBusiness(business: Business) {
        return this.http
            .post(this.deleteBusinessURL, JSON.stringify(business), this.jwt())
            .map((response: Response) => response.json() as Business);
    }

    deletePortalUserRole(pur: PortalUserRole) {
        return this.http
            .post(this.deletePortalUserRoleURL, JSON.stringify(pur), this.jwt())
            .map((response: Response) => response.json() as PortalUserRole);
    }

}

