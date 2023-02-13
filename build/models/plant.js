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
exports.PlantStore = void 0;
const database_1 = __importDefault(require("../database"));
class PlantStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM plants";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get plants. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM plants WHERE id=($1)";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find plant ${id}. Error: ${err}`);
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO plants (name, description) VALUES($1, $2) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [p.name, p.description]);
                const plant = result.rows[0];
                conn.release();
                return plant;
            }
            catch (err) {
                throw new Error(`Could not add new plant ${p.name}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM plants WHERE id=($1)";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const plant = result.rows[0];
                conn.release();
                return plant;
            }
            catch (err) {
                throw new Error(`Could not delete plant ${id}. Error: ${err}`);
            }
        });
    }
}
exports.PlantStore = PlantStore;
