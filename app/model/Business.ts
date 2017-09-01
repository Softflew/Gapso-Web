import {User} from '../model/User';
export class Business {
    public id: number;
    public name: string;
    public owner: User;
    public createdDate: Date;
    public modifiedDate: Date;
    public active: boolean;
    public approved: boolean;
    public mailingAddress: string;
    public emailAddress: string;
    public logo?: any;
  //  public logo?: File;
    
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
    
    getApproved(): boolean {
        return this.active;
    }
    setApproved(active: boolean) {
        this.active = active;
    }
    
    getOwner(): User {
        return this.owner;
    }
    setOwner(owner: User) {
        this.owner = owner;
    }
    
    getEmailAddress(): string {
        return this.emailAddress;
    }
    setEmailAddress(emailAddress: string) {
        this.emailAddress = emailAddress;
    }

    getMailingAddress(): string {
        return this.mailingAddress;
    }
    setMailingAddress(mailingAddress: string) {
        this.mailingAddress = mailingAddress;
    }
    
//    getLogo(): File {
//        return this.logo;
//    }
//    setLogo(logo: File) {
//        this.logo = logo;
//    }
    
    getLogo(): any {
        return this.logo;
    }
    setLogo(logo: any) {
        this.logo = logo;
    }
}
