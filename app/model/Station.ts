import {Business} from '../model/Business';
import {User} from '../model/User';
export class Station{
    public id: number;
    public name: string;
    public createdDate: Date;
    public modifiedDate: Date;
    public active: boolean;
    public business: Business;
    public stationType: string;
    public geoLocation: string;
    public latitude: string;
    public longitude: string;
    public address: string;
    public manager: User;
    
    constructor(
    ) {}

    getId(): number {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }
    
    getName(): string {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }
    
    getAddress(): string {
        return this.address;
    }
    setAddress(address: string) {
        this.address = address;
    }
    
    getLongitude(): string {
        return this.longitude;
    }
    setLongitude(longitude: string) {
        this.longitude = longitude;
    }
    
    getLatitude(): string {
        return this.latitude;
    }
    setLatitude(latitude: string) {
        this.latitude = latitude;
    }
    
    getGeoLocation(): string {
        return this.geoLocation;
    }
    setGeoLocation(geoLocation: string) {
        this.geoLocation = geoLocation;
    }
    
    getStationType(): string {
        return this.stationType;
    }
    setStationType(stationType: string) {
        this.stationType = stationType;
    }

    getCreatedDate(): Date {
        return this.createdDate;
    }
    setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }

    getModifiedDate(): Date {
        return this.modifiedDate;
    }
    setModifiedDate(modifiedDate: Date) {
        this.modifiedDate = modifiedDate;
    }

    getActive(): boolean {
        return this.active;
    }
    setActive(active: boolean) {
        this.active = active;
    }

    getBusiness(): Business {
        return this.business;
    }
    setBusiness(business: Business) {
        this.business = business;
    }
    
    getManager(): User {
        return this.manager;
    }
    setManager(manager: User) {
        this.manager = manager;
    }
}