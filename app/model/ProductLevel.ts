import {StationProduct} from '../model/StationProduct';
import {User} from '../model/User';
export class ProductLevel {
    public id: number;
    public createdDate: Date;
    public modifiedDate: Date;
    public active: boolean;
    public newLevel: number;
    public previousLevel: number;
    public newSupply: number;
    public creator: User;
    public stationProduct: StationProduct;


    constructor(
    ) {}

    getId(): number {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
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

    getNewLevel(): number {
        return this.newLevel;
    }
    setNewLevel(newLevel: number) {
        this.newLevel = newLevel;
    }

    getPreviousLevel(): number {
        return this.previousLevel;
    }
    setPreviousLevel(previousLevel: number) {
        this.previousLevel = previousLevel;
    }

    getNewSupply(): number {
        return this.newSupply;
    }
    setNewSupply(newSupply: number) {
        this.newSupply = newSupply;
    }

    getCreator(): User {
        return this.creator;
    }
    setCreator(creator: User) {
        this.creator = creator;
    }

    getStationProduct(): StationProduct {
        return this.stationProduct;
    }
    setStationProduct(stationProduct: StationProduct) {
        this.stationProduct = stationProduct;
    }

}
