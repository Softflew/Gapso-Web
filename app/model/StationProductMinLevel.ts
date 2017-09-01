import {StationProduct} from '../model/StationProduct';
import {User} from '../model/User';
export class StationProductMinLevel {
    public id: number;
    public createdDate: Date;
    public active: boolean;
    public mininumLevel: number;
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

    getActive(): boolean {
        return this.active;
    }
    setActive(active: boolean) {
        this.active = active;
    }

    getMininumLevel(): number {
        return this.mininumLevel;
    }
    setMininumLevel(mininumLevel: number) {
        this.mininumLevel = mininumLevel;
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
