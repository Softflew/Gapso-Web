"use strict";
var StationProduct = (function () {
    function StationProduct() {
    }
    StationProduct.prototype.getId = function () {
        return this.id;
    };
    StationProduct.prototype.setId = function (id) {
        this.id = id;
    };
    StationProduct.prototype.getAddedDate = function () {
        return this.addedDate;
    };
    StationProduct.prototype.setAddedDate = function (addedDate) {
        this.addedDate = addedDate;
    };
    StationProduct.prototype.getActive = function () {
        return this.active;
    };
    StationProduct.prototype.setActive = function (active) {
        this.active = active;
    };
    StationProduct.prototype.getStation = function () {
        return this.station;
    };
    StationProduct.prototype.setStation = function (station) {
        this.station = station;
    };
    StationProduct.prototype.getProduct = function () {
        return this.product;
    };
    StationProduct.prototype.setProduct = function (product) {
        this.product = product;
    };
    StationProduct.prototype.getCurrentPrice = function () {
        return this.currentPrice;
    };
    StationProduct.prototype.setCurrentPrice = function (currentPrice) {
        this.currentPrice = currentPrice;
    };
    StationProduct.prototype.getCurrentMinLevel = function () {
        return this.currentMinLevel;
    };
    StationProduct.prototype.setCurrentMinLevel = function (currentMinLevel) {
        this.currentMinLevel = currentMinLevel;
    };
    StationProduct.prototype.getCurrentLevel = function () {
        return this.currentLevel;
    };
    StationProduct.prototype.setCurrentLevel = function (currentLevel) {
        this.currentLevel = currentLevel;
    };
    return StationProduct;
}());
exports.StationProduct = StationProduct;
//# sourceMappingURL=StationProduct.js.map