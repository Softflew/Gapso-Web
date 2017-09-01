"use strict";
var Product = (function () {
    function Product() {
    }
    Product.prototype.getId = function () {
        return this.id;
    };
    Product.prototype.setId = function (id) {
        this.id = id;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.setName = function (name) {
        this.name = name;
    };
    Product.prototype.getDescription = function () {
        return this.description;
    };
    Product.prototype.setDescription = function (description) {
        this.description = description;
    };
    Product.prototype.getProductCode = function () {
        return this.productCode;
    };
    Product.prototype.setProductCode = function (productCode) {
        this.productCode = productCode;
    };
    Product.prototype.getUnit = function () {
        return this.unit;
    };
    Product.prototype.setUnit = function (unit) {
        this.unit = unit;
    };
    Product.prototype.getCreatedDate = function () {
        return this.createdDate;
    };
    Product.prototype.setCreatedDate = function (createdDate) {
        this.createdDate = createdDate;
    };
    Product.prototype.getModifiedDate = function () {
        return this.modifiedDate;
    };
    Product.prototype.setModifiedDate = function (modifiedDate) {
        this.modifiedDate = modifiedDate;
    };
    Product.prototype.getActive = function () {
        return this.active;
    };
    Product.prototype.setActive = function (active) {
        this.active = active;
    };
    Product.prototype.getBusiness = function () {
        return this.business;
    };
    Product.prototype.setBusiness = function (business) {
        this.business = business;
    };
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=Product.js.map