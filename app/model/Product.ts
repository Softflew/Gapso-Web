import {Business} from '../model/Business';
export class Product {
    public id: number;
    public name: string;
    public createdDate: Date;
    public modifiedDate: Date;
    public active: boolean;
    public business: Business;
    public description: string;
    public productCode: string;
    public unit: string;


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

    getDescription(): string {
        return this.description;
    }
    setDescription(description: string) {
        this.description = description;
    }

    getProductCode(): string {
        return this.productCode;
    }
    setProductCode(productCode: string) {
        this.productCode = productCode;
    }

    getUnit(): string {
        return this.unit;
    }
    setUnit(unit: string) {
        this.unit = unit;
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

}