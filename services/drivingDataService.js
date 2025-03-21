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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDrivingData = exports.calculateSustainabilityScore = void 0;
const drivingDataModel_1 = __importDefault(require("../models/drivingDataModel"));
const calculateSustainabilityScore = (acceleration, braking, turn) => {
    const maxValues = { acceleration: 3.0, braking: 4.0, turn: 2.5 };
    const avgNormalized = (acceleration / maxValues.acceleration + braking / maxValues.braking + turn / maxValues.turn) / 3;
    return Math.max(0, Math.min(1, 1 - avgNormalized));
};
exports.calculateSustainabilityScore = calculateSustainabilityScore;
const saveDrivingData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isFlagged = data.acceleration > 3.0 || data.braking > 4.0 || data.turn > 2.5;
    const sustainabilityScore = (0, exports.calculateSustainabilityScore)(data.acceleration, data.braking, data.turn);
    const drivingData = new drivingDataModel_1.default(Object.assign(Object.assign({}, data), { isFlagged,
        sustainabilityScore }));
    return yield drivingData.save();
});
exports.saveDrivingData = saveDrivingData;
