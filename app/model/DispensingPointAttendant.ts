import {ProductDispensingPoint} from '../model/ProductDispensingPoint';
import {User} from '../model/User';
export class DispensingPointAttendant {
    public id: number;
    public dispensingPoint: ProductDispensingPoint;
    public createdDate: Date;
    public active: boolean;
    public attendant: User;

    constructor() {}

    getId(): number {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }

    getAttendant(): User {
        return this.attendant;
    }
    setAttendant(attendant: User) {
        this.attendant = attendant;
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
    
    getProductDispensingPoint(): ProductDispensingPoint {
        return this.dispensingPoint;
    }
    setProductDispensingPoint(dispensingPoint: ProductDispensingPoint) {
        this.dispensingPoint = dispensingPoint;
    }
}
