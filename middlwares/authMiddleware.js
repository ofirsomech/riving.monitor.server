"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        // Throw an error instead of returning a response
        return next(new Error('No token, authorization denied'));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded.user;
        next();
    }
    catch (err) {
        return next(new Error('Token is not valid'));
    }
};
exports.default = authMiddleware;
