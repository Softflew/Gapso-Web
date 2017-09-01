"use strict";
var StationPaymentOption = (function () {
    function StationPaymentOption() {
    }
    StationPaymentOption.prototype.getId = function () {
        return this.id;
    };
    StationPaymentOption.prototype.setId = function (id) {
        this.id = id;
    };
    StationPaymentOption.prototype.getAddedDate = function () {
        return this.addedDate;
    };
    StationPaymentOption.prototype.setAddedDate = function (addedDate) {
        this.addedDate = addedDate;
    };
    StationPaymentOption.prototype.getActive = function () {
        return this.active;
    };
    StationPaymentOption.prototype.setActive = function (active) {
        this.active = active;
    };
    StationPaymentOption.prototype.getStation = function () {
        return this.station;
    };
    StationPaymentOption.prototype.setStation = function (station) {
        this.station = station;
    };
    StationPaymentOption.prototype.getPaymentOption = function () {
        return this.paymentOption;
    };
    StationPaymentOption.prototype.setPaymentOption = function (paymentOption) {
        this.paymentOption = paymentOption;
    };
    return StationPaymentOption;
}());
exports.StationPaymentOption = StationPaymentOption;
//# sourceMappingURL=StationPaymentOption.js.map