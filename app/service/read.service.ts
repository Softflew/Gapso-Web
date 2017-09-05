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
export class ReadService {
    // URL to web api
    private baseURL = 'http://localhost:8080/Gapso-web/service/read/';

    constructor(public http: Http) {}

    private getUserRoleURL = this.baseURL + 'getUserRole?';

    private jwt() {
        // create authorization header with jwt token
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});
    }

    getUserRole(userId: number) {
        const url = `${this.getUserRoleURL}userId=${userId}`;
        return this.http.get(url)
            .map((response: Response) => response.json());
    }
}
