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
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const salt = process.env.SALT_ROUNDS;
class UserStore {
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO User_info (id, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *";
                const conn = yield database_1.default.connect();
                const hash = bcrypt_1.default.hashSync(u.password + process.env.BCRYPT_PASSWORD, parseInt(salt));
                const result = yield conn.query(sql, [
                    u.id,
                    u.firstname,
                    u.lastname,
                    hash,
                ]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not add new user ${u.firstname}. Error: ${err}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM User_info";
            const conn = yield database_1.default.connect();
            const result = yield conn.query(sql);
            conn.release();
            return result.rows;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM User_info WHERE id=($1)";
            const conn = yield database_1.default.connect();
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM User_info WHERE id=($1)";
            const conn = yield database_1.default.connect();
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        });
    }
    authenticate(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT password FROM User_info WHERE id=($1)";
            const conn = yield database_1.default.connect();
            const result = yield conn.query(sql, [id]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
                    const sql = "SELECT * FROM User_info WHERE id=($1)";
                    const res = yield conn.query(sql, [id]);
                    conn.release();
                    console.log("passwords match");
                    return res.rows[0];
                }
            }
            return null;
        });
    }
}
exports.UserStore = UserStore;
