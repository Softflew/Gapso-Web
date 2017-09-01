"use strict";
var ProductDispensingPoint = (function () {
    function ProductDispensingPoint() {
    }
    ProductDispensingPoint.prototype.getId = function () {
        return this.id;
    };
    ProductDispensingPoint.prototype.setId = function (id) {
        this.id = id;
    };
    ProductDispensingPoint.prototype.getName = function () {
        return this.name;
    };
    ProductDispensingPoint.prototype.setName = function (name) {
        this.name = name;
    };
    ProductDispensingPoint.prototype.getCurrentAttendant = function () {
        return this.currentAttendant;
    };
    ProductDispensingPoint.prototype.setCurrentAttendant = function (currentAttendant) {
        this.currentAttendant = currentAttendant;
    };
    ProductDispensingPoint.prototype.getCreatedDate = function () {
        return this.createdDate;
    };
    ProductDispensingPoint.prototype.setCreatedDate = function (createdDate) {
        this.createdDate = createdDate;
    };
    ProductDispensingPoint.prototype.getModifiedDate = function () {
        return this.modifiedDate;
    };
    ProductDispensingPoint.prototype.setModifiedDate = function (modifiedDate) {
        this.modifiedDate = modifiedDate;
    };
    ProductDispensingPoint.prototype.getActive = function () {
        return this.active;
    };
    ProductDispensingPoint.prototype.setActive = function (active) {
        this.active = active;
    };
    ProductDispensingPoint.prototype.getStation = function () {
        return this.station;
    };
    ProductDispensingPoint.prototype.setStation = function (station) {
        this.station = station;
    };
    ProductDispensingPoint.prototype.getProduct = function () {
        return this.product;
    };
    ProductDispensingPoint.prototype.setProduct = function (product) {
        this.product = product;
    };
    return ProductDispensingPoint;
}());
exports.ProductDispensingPoint = ProductDispensingPoint;
//# sourceMappingURL=ProductDispensingPoint.js.map