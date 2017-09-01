export class User {
    public id: number;
    public firstName: string;
    public surname: string;
    public emailAddress: string;
    public phoneNumber: string;
    public password: string;
    public middleName?: string;
    public createdDate: Date;
    public modifiedDate: Date;
    public active: boolean;
    public token: string;
    public designation: string;
    public businessId: number;
    public stationId: number;

    constructor(
    ) {}

    getId(): number {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }

    getFirstName(): string {
        return this.firstName;
    }
    setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    getSurname(): string {
        return this.surname;
    }
    setSurname(surname: string) {
        this.surname = surname;
    }

    getEmailAddress(): string {
        return this.emailAddress;
    }
    setEmailAddress(emailAddress: string) {
        this.emailAddress = emailAddress;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }
    setPhoneNumber(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    }

    getPassword(): string {
        return this.password;
    }
    setPassword(password: string) {
        this.password = password;
    }

    getMiddleName(): string {
        return this.middleName;
    }
    setMiddleName(middleName: string) {
        this.middleName = middleName;
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

    getToken(): string {
        return this.token;
    }
    setToken(token: string) {
        this.token = token;
    }

    getBusinessId(): number {
        return this.businessId;
    }
    setBusinessId(businessId: number) {
        this.businessId = businessId;
    }

    getStationId(): number {
        return this.stationId;
    }
    setStationId(stationId: number) {
        this.stationId = stationId;
    }

    getDesignation(): string {
        return this.designation;
    }
    setDesignation(designation: string) {
        this.designation = designation;
    }
}
