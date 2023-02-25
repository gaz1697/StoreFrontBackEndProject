import { Connection } from "pg";

import client from "../database";

export type plant = {
  id: number;
  name: string;
  description: string;
};

export class PlantStore {
  async index(): Promise<plant[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM plants";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get plants. Error: ${err}`);
    }
  }

  async show(id: string): Promise<plant> {
    try {
      const sql = "SELECT * FROM plants WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find plant ${id}. Error: ${err}`);
    }
  }

  async create(p: plant): Promise<plant> {
    try {
      const sql =
        "INSERT INTO plants (id, name, description) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [p.id, p.name, p.description]);
      const plant = result.rows[0];
      conn.release();
      return plant;
    } catch (err) {
      throw new Error(`Could not add new plant ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<plant> {
    try {
      const sql = "DELETE FROM plants WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const plant = result.rows[0];
      conn.release();
      return plant;
    } catch (err) {
      throw new Error(`Could not delete plant ${id}. Error: ${err}`);
    }
  }
}
