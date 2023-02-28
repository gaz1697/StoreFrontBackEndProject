"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./handlers/user"));
const order_1 = __importDefault(require("./handlers/order"));
const product_1 = __importDefault(require("./handlers/product"));
const dashboard_1 = __importDefault(require("./handlers/dashboard"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
const userRoutes = (0, user_1.default)(app);
const orderRoutes = (0, order_1.default)(app);
const productRoutes = (0, product_1.default)(app);
const dashboardRoutes = (0, dashboard_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
