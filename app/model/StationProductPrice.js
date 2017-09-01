"use strict";
var StationProductPrice = (function () {
    function StationProductPrice() {
    }
    StationProductPrice.prototype.getId = function () {
        return this.id;
    };
    StationProductPrice.prototype.setId = function (id) {
        this.id = id;
    };
    StationProductPrice.prototype.getCreatedDate = function () {
        return this.createdDate;
    };
    StationProductPrice.prototype.setCreatedDate = function (createdDate) {
        this.createdDate = createdDate;
    };
    StationProductPrice.prototype.getActive = function () {
        return this.active;
    };
    StationProductPrice.prototype.setActive = function (active) {
        this.active = active;
    };
    StationProductPrice.prototype.getPrice = function () {
        return this.price;
    };
    StationProductPrice.prototype.setPrice = function (price) {
        this.price = price;
    };
    StationProductPrice.prototype.getCreator = function () {
        return this.creator;
    };
    StationProductPrice.prototype.setCreator = function (creator) {
        this.creator = creator;
    };
    StationProductPrice.prototype.getStationProduct = function () {
        return this.stationProduct;
    };
    StationProductPrice.prototype.setStationProduct = function (stationProduct) {
        this.stationProduct = stationProduct;
    };
    return StationProductPrice;
}());
exports.StationProductPrice = StationProductPrice;
//# sourceMappingURL=StationProductPrice.js.map