import {Business} from '../model/Business';
import {User} from '../model/User';
import {Station} from '../model/Station';
import {DispensingPointAttendant} from '../model/DispensingPointAttendant';

export class PortalUserRole {
    public id: number
    public business: Business;
    public station: Station;
    public portalUser: User;
    public designation: string;
    public dispensingPointAttendant: DispensingPointAttendant;
    public active: boolean;

    constructor(
    ) {}

    getId(): number {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }

    getBusiness(): Business {
        return this.business;
    }
    setBusiness(business: Business) {
        this.business = business;
    }

    getStation(): Station {
        return this.station;
    }
    setStation(station: Station) {
        this.station = station;
    }

    getUser(): User {
        return this.portalUser;
    }
    setUser(portalUser: User) {
        this.portalUser = portalUser;
    }

    getDesignation(): string {
        return this.designation;
    }
    setDesignation(designation: string) {
        this.designation = designation;
    }

    getActive(): boolean {
        return this.active;
    }
    setActive(active: boolean) {
        this.active = active;
    }
    
    getDispensingPointAttendant(): DispensingPointAttendant {
        return this.dispensingPointAttendant;
    }
    setDispensingPointAttendant(dispensingPointAttendant: DispensingPointAttendant) {
        this.dispensingPointAttendant = dispensingPointAttendant;
    }
    

}