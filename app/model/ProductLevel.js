"use strict";
var ProductLevel = (function () {
    function ProductLevel() {
    }
    ProductLevel.prototype.getId = function () {
        return this.id;
    };
    ProductLevel.prototype.setId = function (id) {
        this.id = id;
    };
    ProductLevel.prototype.getCreatedDate = function () {
        return this.createdDate;
    };
    ProductLevel.prototype.setCreatedDate = function (createdDate) {
        this.createdDate = createdDate;
    };
    ProductLevel.prototype.getModifiedDate = function () {
        return this.modifiedDate;
    };
    ProductLevel.prototype.setModifiedDate = function (modifiedDate) {
        this.modifiedDate = modifiedDate;
    };
    ProductLevel.prototype.getActive = function () {
        return this.active;
    };
    ProductLevel.prototype.setActive = function (active) {
        this.active = active;
    };
    ProductLevel.prototype.getNewLevel = function () {
        return this.newLevel;
    };
    ProductLevel.prototype.setNewLevel = function (newLevel) {
        this.newLevel = newLevel;
    };
    ProductLevel.prototype.getPreviousLevel = function () {
        return this.previousLevel;
    };
    ProductLevel.prototype.setPreviousLevel = function (previousLevel) {
        this.previousLevel = previousLevel;
    };
    ProductLevel.prototype.getNewSupply = function () {
        return this.newSupply;
    };
    ProductLevel.prototype.setNewSupply = function (newSupply) {
        this.newSupply = newSupply;
    };
    ProductLevel.prototype.getCreator = function () {
        return this.creator;
    };
    ProductLevel.prototype.setCreator = function (creator) {
        this.creator = creator;
    };
    ProductLevel.prototype.getStationProduct = function () {
        return this.stationProduct;
    };
    ProductLevel.prototype.setStationProduct = function (stationProduct) {
        this.stationProduct = stationProduct;
    };
    return ProductLevel;
}());
exports.ProductLevel = ProductLevel;
//# sourceMappingURL=ProductLevel.js.map