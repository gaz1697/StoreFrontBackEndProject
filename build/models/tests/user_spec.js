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
const user_1 = require("../user");
const store = new user_1.UserStore();
describe("User Model", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield store.create({
            id: 1,
            firstname: "test",
            lastname: "test",
            password: "test",
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield store.delete("1");
    }));
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
    it("index method should return a list of users", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result[0].id).toEqual(1);
        expect(result[0].firstname).toEqual("test");
        expect(result[0].lastname).toEqual("test");
    }));
    it("show method should return the correct user", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show("1");
        expect(result.id).toEqual(1);
        expect(result.firstname).toEqual("test");
        expect(result.lastname).toEqual("test");
    }));
    it("authenticate method should return the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.authenticate("1", "test");
        expect(result.id).toEqual(1);
        expect(result.firstname).toEqual("test");
        expect(result.lastname).toEqual("test");
    }));
    it("authenticate method should return null", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.authenticate("1", "wrong");
        expect(result).toEqual(null);
    }));
});
