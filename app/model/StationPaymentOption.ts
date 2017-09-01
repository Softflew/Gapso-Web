import {PaymentOption} from '../model/PaymentOption';
import {Station} from '../model/Station';
export class StationPaymentOption {
    public id: number;
    public addedDate: Date;
    public active: boolean;
    public station: Station;
    public paymentOption: PaymentOption;
   
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

    getPaymentOption(): PaymentOption {
        return this.paymentOption;
    }
    setPaymentOption(paymentOption: PaymentOption) {
        this.paymentOption = paymentOption;
    }

    }
