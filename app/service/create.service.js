"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var CreateService = (function () {
    function CreateService(http) {
        this.http = http;
        // URL to web api
        this.baseURL = 'http://localhost:8080/Gapso-web/service/create/';
        this.createUserURL = this.baseURL + 'createPortalUser';
        this.createBusinessURL = this.baseURL + 'createBusiness';
        this.createPortalUserRoleURL = this.baseURL + 'createPortalUserRole';
    }
    CreateService.prototype.createUser = function (user) {
        return this.http
            .post(this.createUserURL, JSON.stringify(user), this.jwt())
            .map(function (response) { return response.json(); });
    };
    CreateService.prototype.createBusiness = function (business) {
        return this.http
            .post(this.createBusinessURL, JSON.stringify(business), this.jwt())
            .map(function (response) { return response.json(); });
    };
    CreateService.prototype.createPortalUserRole = function (pur) {
        return this.http
            .post(this.createPortalUserRoleURL, JSON.stringify(pur), this.jwt())
            .map(function (response) { return response.json(); });
    };
    CreateService.prototype.jwt = function () {
        // create authorization header with jwt token
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return new http_1.RequestOptions({ headers: headers });
    };
    CreateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CreateService);
    return CreateService;
}());
exports.CreateService = CreateService;
//# sourceMappingURL=create.service.js.map