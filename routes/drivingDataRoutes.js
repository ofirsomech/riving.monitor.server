"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const drivingDataController_1 = require("../controllers/drivingDataController");
const authMiddleware_1 = __importDefault(require("../middlwares/authMiddleware"));
const router = express_1.default.Router();
router.post('/monitor-behavior', authMiddleware_1.default, drivingDataController_1.monitorBehavior);
exports.default = router;
