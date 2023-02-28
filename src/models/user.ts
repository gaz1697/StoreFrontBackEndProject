import bcrypt from "bcrypt";
import client from "../database";

export type user = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};
const salt = process.env.SALT_ROUNDS;
export class UserStore {
  async create(u: user): Promise<user> {
    try {
      const sql =
        "INSERT INTO User_info (id, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *";
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        u.password + process.env.BCRYPT_PASSWORD,
        parseInt(salt!)
      );
      const result = await conn.query(sql, [
        u.id,
        u.firstname,
        u.lastname,
        hash,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstname}. Error: ${err}`);
    }
  }
  async index(): Promise<user[]> {
    const sql = "SELECT * FROM User_info";
    const conn = await client.connect();
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }
  async show(id: string): Promise<user> {
    const sql = "SELECT * FROM User_info WHERE id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }
  async delete(id: string): Promise<user> {
    const sql = "DELETE FROM User_info WHERE id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }
  async authenticate(id: string, password: string): Promise<user | null> {
    const sql = "SELECT password FROM User_info WHERE id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [id]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (
        bcrypt.compareSync(
          password + process.env.BCRYPT_PASSWORD,
          user.password
        )
      ) {
        const sql = "SELECT * FROM User_info WHERE id=($1)";
        const res = await conn.query(sql, [id]);
        conn.release();
        console.log("passwords match");
        return res.rows[0];
      }
    }
    return null;
  }
}
