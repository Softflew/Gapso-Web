import {StationProductPrice} from '../model/StationProductPrice';
import {DispensingPointAttendant} from '../model/DispensingPointAttendant';

export class DailySales {
    public id: number;
    public saleDate: Date;
    public quantity: number;
    public dispensingPointAttendant: DispensingPointAttendant;
    public stationProductPrice: StationProductPrice;
    public paymentOptionId: number;


    constructor(
    ) {}

    getId(): number {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }

    getPaymentOptionId(): number {
        return this.paymentOptionId;
    }
    setPaymentOptionId(paymentOptionId: number) {
        this.paymentOptionId = paymentOptionId;
    }
    getSaleDate(): Date {
        return this.saleDate;
    }
    setSaleDate(saleDate: Date) {
        this.saleDate = saleDate;
    }

    getQuantity(): number {
        return this.quantity;
    }
    setQuantity(quantity: number) {
        this.quantity = quantity;
    }

    getDispensingPointAttendant(): DispensingPointAttendant {
        return this.dispensingPointAttendant;
    }
    setDispensingPointAttendant(dispensingPointAttendant: DispensingPointAttendant) {
        this.dispensingPointAttendant = dispensingPointAttendant;
    }

    getStationProductPrice(): StationProductPrice {
        return this.stationProductPrice;
    }
    setStationProductPrice(stationProductPrice: StationProductPrice) {
        this.stationProductPrice = stationProductPrice;
    }
}