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
const plant_1 = require("../plant");
const store = new plant_1.PlantStore();
describe("Plant Model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have a show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have a delete method", () => {
        expect(store.delete).toBeDefined();
    });
    it("create method should add a plant", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            name: "test",
            description: "test",
            id: 0,
        });
        expect(result).toEqual({
            id: 1,
            name: "test",
            description: "test",
        });
    }));
    it("index method should return a list of plants", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: "test",
                description: "test",
            },
        ]);
    }));
    it("show method should return the correct plant", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show("1");
        expect(result).toEqual({
            id: 1,
            name: "test",
            description: "test",
        });
    }));
    it("delete method should remove the plant", () => __awaiter(void 0, void 0, void 0, function* () {
        yield store.delete("1");
        const result = yield store.index();
        expect(result).toEqual([]);
    }));
});
