import client from "../database";

export type product = {
  id: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<product[]> {
    const sql = "SELECT * FROM products";
    const conn = await client.connect();
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }
  async show(id: string): Promise<product> {
    const sql = "SELECT * FROM products where id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql);
    conn.release();
    return result.rows[0];
  }
  async create(p: product): Promise<product> {
    try {
      const sql =
        "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [p.name, p.price]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }
  async update(p: product): Promise<product> {
    const sql = "UPDATE products SET name=($1), price=($2) WHERE id=($3)";
    const conn = await client.connect();
    const result = await conn.query(sql, [p.name, p.price, p.id]);
    const product = result.rows[0];
    conn.release();
    return product;
  }
  async delete(id: string): Promise<product> {
    const sql = "DELETE FROM products WHERE id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }
}
