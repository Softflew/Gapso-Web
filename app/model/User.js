"use strict";
var User = (function () {
    function User() {
    }
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.setId = function (id) {
        this.id = id;
    };
    User.prototype.getFirstName = function () {
        return this.firstName;
    };
    User.prototype.setFirstName = function (firstName) {
        this.firstName = firstName;
    };
    User.prototype.getSurname = function () {
        return this.surname;
    };
    User.prototype.setSurname = function (surname) {
        this.surname = surname;
    };
    User.prototype.getEmailAddress = function () {
        return this.emailAddress;
    };
    User.prototype.setEmailAddress = function (emailAddress) {
        this.emailAddress = emailAddress;
    };
    User.prototype.getPhoneNumber = function () {
        return this.phoneNumber;
    };
    User.prototype.setPhoneNumber = function (phoneNumber) {
        this.phoneNumber = phoneNumber;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.setPassword = function (password) {
        this.password = password;
    };
    User.prototype.getMiddleName = function () {
        return this.middleName;
    };
    User.prototype.setMiddleName = function (middleName) {
        this.middleName = middleName;
    };
    User.prototype.getCreatedDate = function () {
        return this.createdDate;
    };
    User.prototype.setCreatedDate = function (createdDate) {
        this.createdDate = createdDate;
    };
    User.prototype.getModifiedDate = function () {
        return this.modifiedDate;
    };
    User.prototype.setModifiedDate = function (modifiedDate) {
        this.modifiedDate = modifiedDate;
    };
    User.prototype.getActive = function () {
        return this.active;
    };
    User.prototype.setActive = function (active) {
        this.active = active;
    };
    User.prototype.getToken = function () {
        return this.token;
    };
    User.prototype.setToken = function (token) {
        this.token = token;
    };
    User.prototype.getBusinessId = function () {
        return this.businessId;
    };
    User.prototype.setBusinessId = function (businessId) {
        this.businessId = businessId;
    };
    User.prototype.getStationId = function () {
        return this.stationId;
    };
    User.prototype.setStationId = function (stationId) {
        this.stationId = stationId;
    };
    User.prototype.getDesignation = function () {
        return this.designation;
    };
    User.prototype.setDesignation = function (designation) {
        this.designation = designation;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map