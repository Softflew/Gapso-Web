"use strict";
var Business = (function () {
    //  public logo?: File;
    function Business() {
    }
    Business.prototype.getId = function () {
        return this.id;
    };
    Business.prototype.setId = function (id) {
        this.id = id;
    };
    Business.prototype.getName = function () {
        return this.name;
    };
    Business.prototype.setName = function (name) {
        this.name = name;
    };
    Business.prototype.getCreatedDate = function () {
        return this.createdDate;
    };
    Business.prototype.setCreatedDate = function (createdDate) {
        this.createdDate = createdDate;
    };
    Business.prototype.getModifiedDate = function () {
        return this.modifiedDate;
    };
    Business.prototype.setModifiedDate = function (modifiedDate) {
        this.modifiedDate = modifiedDate;
    };
    Business.prototype.getActive = function () {
        return this.active;
    };
    Business.prototype.setActive = function (active) {
        this.active = active;
    };
    Business.prototype.getApproved = function () {
        return this.active;
    };
    Business.prototype.setApproved = function (active) {
        this.active = active;
    };
    Business.prototype.getOwner = function () {
        return this.owner;
    };
    Business.prototype.setOwner = function (owner) {
        this.owner = owner;
    };
    Business.prototype.getEmailAddress = function () {
        return this.emailAddress;
    };
    Business.prototype.setEmailAddress = function (emailAddress) {
        this.emailAddress = emailAddress;
    };
    Business.prototype.getMailingAddress = function () {
        return this.mailingAddress;
    };
    Business.prototype.setMailingAddress = function (mailingAddress) {
        this.mailingAddress = mailingAddress;
    };
    //    getLogo(): File {
    //        return this.logo;
    //    }
    //    setLogo(logo: File) {
    //        this.logo = logo;
    //    }
    Business.prototype.getLogo = function () {
        return this.logo;
    };
    Business.prototype.setLogo = function (logo) {
        this.logo = logo;
    };
    return Business;
}());
exports.Business = Business;
//# sourceMappingURL=Business.js.map