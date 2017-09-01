import {Product} from '../model/Product';
import {Station} from '../model/Station';
export class StationProduct {
    public id: number;
    public addedDate: Date;
    public active: boolean;
    public station: Station;
    public product: Product;
    public currentPrice: number;
    public currentMinLevel: number;
    public currentLevel: number;


    constructor(
    ) {}

    getId(): number {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }

    getAddedDate(): Date {
        return this.addedDate;
    }
    setAddedDate(addedDate: Date) {
        this.addedDate = addedDate;
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

    getCurrentPrice(): number {
        return this.currentPrice;
    }
    setCurrentPrice(currentPrice: number) {
        this.currentPrice = currentPrice;
    }
    
     getCurrentMinLevel(): number {
        return this.currentMinLevel;
    }
    setCurrentMinLevel(currentMinLevel: number) {
        this.currentMinLevel = currentMinLevel;
    }
    
     getCurrentLevel(): number {
        return this.currentLevel;
    }
    setCurrentLevel(currentLevel: number) {
        this.currentLevel = currentLevel;
    }

}
