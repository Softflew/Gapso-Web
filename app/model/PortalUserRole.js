"use strict";
var PortalUserRole = (function () {
    function PortalUserRole() {
    }
    PortalUserRole.prototype.getId = function () {
        return this.id;
    };
    PortalUserRole.prototype.setId = function (id) {
        this.id = id;
    };
    PortalUserRole.prototype.getBusiness = function () {
        return this.business;
    };
    PortalUserRole.prototype.setBusiness = function (business) {
        this.business = business;
    };
    PortalUserRole.prototype.getStation = function () {
        return this.station;
    };
    PortalUserRole.prototype.setStation = function (station) {
        this.station = station;
    };
    PortalUserRole.prototype.getUser = function () {
        return this.portalUser;
    };
    PortalUserRole.prototype.setUser = function (portalUser) {
        this.portalUser = portalUser;
    };
    PortalUserRole.prototype.getDesignation = function () {
        return this.designation;
    };
    PortalUserRole.prototype.setDesignation = function (designation) {
        this.designation = designation;
    };
    PortalUserRole.prototype.getActive = function () {
        return this.active;
    };
    PortalUserRole.prototype.setActive = function (active) {
        this.active = active;
    };
    PortalUserRole.prototype.getDispensingPointAttendant = function () {
        return this.dispensingPointAttendant;
    };
    PortalUserRole.prototype.setDispensingPointAttendant = function (dispensingPointAttendant) {
        this.dispensingPointAttendant = dispensingPointAttendant;
    };
    return PortalUserRole;
}());
exports.PortalUserRole = PortalUserRole;
//# sourceMappingURL=PortalUserRole.js.map