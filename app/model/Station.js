"use strict";
var Station = (function () {
    function Station() {
    }
    Station.prototype.getId = function () {
        return this.id;
    };
    Station.prototype.setId = function (id) {
        this.id = id;
    };
    Station.prototype.getName = function () {
        return this.name;
    };
    Station.prototype.setName = function (name) {
        this.name = name;
    };
    Station.prototype.getAddress = function () {
        return this.address;
    };
    Station.prototype.setAddress = function (address) {
        this.address = address;
    };
    Station.prototype.getLongitude = function () {
        return this.longitude;
    };
    Station.prototype.setLongitude = function (longitude) {
        this.longitude = longitude;
    };
    Station.prototype.getLatitude = function () {
        return this.latitude;
    };
    Station.prototype.setLatitude = function (latitude) {
        this.latitude = latitude;
    };
    Station.prototype.getGeoLocation = function () {
        return this.geoLocation;
    };
    Station.prototype.setGeoLocation = function (geoLocation) {
        this.geoLocation = geoLocation;
    };
    Station.prototype.getStationType = function () {
        return this.stationType;
    };
    Station.prototype.setStationType = function (stationType) {
        this.stationType = stationType;
    };
    Station.prototype.getCreatedDate = function () {
        return this.createdDate;
    };
    Station.prototype.setCreatedDate = function (createdDate) {
        this.createdDate = createdDate;
    };
    Station.prototype.getModifiedDate = function () {
        return this.modifiedDate;
    };
    Station.prototype.setModifiedDate = function (modifiedDate) {
        this.modifiedDate = modifiedDate;
    };
    Station.prototype.getActive = function () {
        return this.active;
    };
    Station.prototype.setActive = function (active) {
        this.active = active;
    };
    Station.prototype.getBusiness = function () {
        return this.business;
    };
    Station.prototype.setBusiness = function (business) {
        this.business = business;
    };
    Station.prototype.getManager = function () {
        return this.manager;
    };
    Station.prototype.setManager = function (manager) {
        this.manager = manager;
    };
    return Station;
}());
exports.Station = Station;
//# sourceMappingURL=Station.js.map