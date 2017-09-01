"use strict";
var DispensingPointAttendant = (function () {
    function DispensingPointAttendant() {
    }
    DispensingPointAttendant.prototype.getId = function () {
        return this.id;
    };
    DispensingPointAttendant.prototype.setId = function (id) {
        this.id = id;
    };
    DispensingPointAttendant.prototype.getAttendant = function () {
        return this.attendant;
    };
    DispensingPointAttendant.prototype.setAttendant = function (attendant) {
        this.attendant = attendant;
    };
    DispensingPointAttendant.prototype.getCreatedDate = function () {
        return this.createdDate;
    };
    DispensingPointAttendant.prototype.setCreatedDate = function (createdDate) {
        this.createdDate = createdDate;
    };
    DispensingPointAttendant.prototype.getActive = function () {
        return this.active;
    };
    DispensingPointAttendant.prototype.setActive = function (active) {
        this.active = active;
    };
    DispensingPointAttendant.prototype.getProductDispensingPoint = function () {
        return this.dispensingPoint;
    };
    DispensingPointAttendant.prototype.setProductDispensingPoint = function (dispensingPoint) {
        this.dispensingPoint = dispensingPoint;
    };
    return DispensingPointAttendant;
}());
exports.DispensingPointAttendant = DispensingPointAttendant;
//# sourceMappingURL=DispensingPointAttendant.js.map