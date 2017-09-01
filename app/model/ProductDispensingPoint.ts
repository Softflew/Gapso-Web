import {Product} from '../model/Product';
import {Station} from '../model/Station';
export class ProductDispensingPoint {
    public id: number;
    public name: string;
    public createdDate: Date;
    public modifiedDate: Date;
    public active: boolean;
    public station: Station;
    public product: Product;
    public currentAttendant: string;

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

    getCurrentAttendant(): string {
        return this.currentAttendant;
    }
    setCurrentAttendant(currentAttendant: string) {
        this.currentAttendant = currentAttendant;
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

    getStation(): Station {
        return this.station;
    }
    setStation(station: Station) {
        this.station = station;
    }

    getProduct(): Product {
        return this.product;
    }
    setProduct(product: Product) {
        this.product = product;
    }
}
