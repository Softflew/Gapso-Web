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
var ReadService = (function () {
    function ReadService(http) {
        this.http = http;
        // URL to web api
        this.baseURL = 'http://localhost:8080/Gapso-web/service/read/';
        this.getUserRoleURL = this.baseURL + 'getUserRole?';
    }
    ReadService.prototype.jwt = function () {
        // create authorization header with jwt token
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return new http_1.RequestOptions({ headers: headers });
    };
    ReadService.prototype.getUserRole = function (userId) {
        var url = this.getUserRoleURL + "userId=" + userId;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    ReadService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReadService);
    return ReadService;
}());
exports.ReadService = ReadService;
//# sourceMappingURL=read.service.js.map