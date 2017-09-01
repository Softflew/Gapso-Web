"use strict";
var DailySales = (function () {
    function DailySales() {
    }
    DailySales.prototype.getId = function () {
        return this.id;
    };
    DailySales.prototype.setId = function (id) {
        this.id = id;
    };
    DailySales.prototype.getPaymentOptionId = function () {
        return this.paymentOptionId;
    };
    DailySales.prototype.setPaymentOptionId = function (paymentOptionId) {
        this.paymentOptionId = paymentOptionId;
    };
    DailySales.prototype.getSaleDate = function () {
        return this.saleDate;
    };
    DailySales.prototype.setSaleDate = function (saleDate) {
        this.saleDate = saleDate;
    };
    DailySales.prototype.getQuantity = function () {
        return this.quantity;
    };
    DailySales.prototype.setQuantity = function (quantity) {
        this.quantity = quantity;
    };
    DailySales.prototype.getDispensingPointAttendant = function () {
        return this.dispensingPointAttendant;
    };
    DailySales.prototype.setDispensingPointAttendant = function (dispensingPointAttendant) {
        this.dispensingPointAttendant = dispensingPointAttendant;
    };
    DailySales.prototype.getStationProductPrice = function () {
        return this.stationProductPrice;
    };
    DailySales.prototype.setStationProductPrice = function (stationProductPrice) {
        this.stationProductPrice = stationProductPrice;
    };
    return DailySales;
}());
exports.DailySales = DailySales;
//# sourceMappingURL=DailySales.js.map