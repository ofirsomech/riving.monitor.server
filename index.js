"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./utils/db"));
const drivingDataRoutes_1 = __importDefault(require("./routes/drivingDataRoutes"));
const dotenvConfig_1 = require("./config/dotenvConfig");
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api', drivingDataRoutes_1.default);
// Start server and connect to DB
(0, db_1.default)();
app.listen(dotenvConfig_1.PORT, () => console.log(`Server running on port ${dotenvConfig_1.PORT}`));
