"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jwt_1 = require("next-auth/jwt");
const http_helpers_1 = require("../utils/http-helpers");
const isAuth = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            throw new http_helpers_1.HttpError("Not authenticated.", 401);
        }
        const token = authHeader.split(" ")[1];
        let decodedToken;
        try {
            decodedToken = yield (0, jwt_1.decode)({ token, secret: process.env.authSecret });
        }
        catch (err) {
            throw new http_helpers_1.HttpError("An error occurred in authentication", 500);
        }
        if (!decodedToken) {
            throw new http_helpers_1.HttpError("Not authenticated.", 401);
        }
        req.userId = decodedToken.id;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.isAuth = isAuth;
