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
const plant_1 = require("../models/plant");
const store = new plant_1.PlantStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plants = yield store.index();
    res.json(plants);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plant = yield store.show(req.params.id);
    res.json(plant);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plant = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
        };
        const newPlant = yield store.create(plant);
        res.json(newPlant);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield store.delete(req.params.id);
    res.json(deleted);
});
const plant_routes = (app) => {
    app.get("/plants", index);
    app.get("/plants/:id", show);
    app.post("/plants", create);
    app.delete("/plants/:id", remove);
};
exports.default = plant_routes;
