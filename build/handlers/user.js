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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const newUser = yield store.create(user);
        res.json(newUser);
    }
    catch (err) {
        res.status(400);
        res.json("User already exists");
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader;
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    const users = yield store.index();
    res.json(users);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader;
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    const user = yield store.show(req.params.id);
    res.json(user);
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("remove");
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader;
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    const deleted = yield store.delete(req.params.id);
    res.json("deleted");
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auser = yield store.authenticate(req.body.id, req.body.password);
    var token = jsonwebtoken_1.default.sign({ user: auser }, process.env.TOKEN_SECRET);
    res.json(token);
});
const user_routes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
    app.delete("/users/:id", remove);
    app.post("/users/authenticate", authenticate);
};
exports.default = user_routes;
