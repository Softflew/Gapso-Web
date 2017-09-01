"use strict";
var PaymentOption = (function () {
    function PaymentOption() {
    }
    PaymentOption.prototype.getId = function () {
        return this.id;
    };
    PaymentOption.prototype.setId = function (id) {
        this.id = id;
    };
    PaymentOption.prototype.getName = function () {
        return this.name;
    };
    PaymentOption.prototype.setName = function (name) {
        this.name = name;
    };
    PaymentOption.prototype.getDescription = function () {
        return this.description;
    };
    PaymentOption.prototype.setDescription = function (description) {
        this.description = description;
    };
    PaymentOption.prototype.getCreatedDate = function () {
        return this.createdDate;
    };
    PaymentOption.prototype.setCreatedDate = function (createdDate) {
        this.createdDate = createdDate;
    };
    PaymentOption.prototype.getModifiedDate = function () {
        return this.modifiedDate;
    };
    PaymentOption.prototype.setModifiedDate = function (modifiedDate) {
        this.modifiedDate = modifiedDate;
    };
    PaymentOption.prototype.getActive = function () {
        return this.active;
    };
    PaymentOption.prototype.setActive = function (active) {
        this.active = active;
    };
    PaymentOption.prototype.getBusiness = function () {
        return this.business;
    };
    PaymentOption.prototype.setBusiness = function (business) {
        this.business = business;
    };
    return PaymentOption;
}());
exports.PaymentOption = PaymentOption;
//# sourceMappingURL=PaymentOption.js.map