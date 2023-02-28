import client from "../database";

export type order = {
  id: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  async index(): Promise<order[]> {
    const sql = "SELECT * FROM orders";
    const conn = await client.connect();
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }
  async show(id: string): Promise<order[]> {
    const sql = "SELECT * FROM orders where id=($1)";
    const conn = await client.connect();
    const result = await client.query(sql, [id]);
    conn.release();
    return result.rows;
  }
  async create(o: order[]): Promise<order> {
    try {
      const sql =
        "INSERT INTO orders (id, product_id, quantity, user_id, status) VALUES($1, $2, $3, $4, $5) RETURNING *";
      const conn = await client.connect();
      const order_id = o[0].id;
      const user_id = o[0].user_id;
      const status = o[0].status;
      for (let i = 0; i < o.length; i++) {
        const result = await conn.query(sql, [
          order_id,
          o[i].product_id,
          o[i].quantity,
          user_id,
          status,
        ]);
      }
      const ordSql = "SELECT * FROM orders WHERE id=($1)";
      const ordRes = await conn.query(ordSql, [order_id]);
      const order = ordRes.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add Order Error: ${err}`);
    }
  }
  async update(o: order): Promise<order> {
    const sql =
      "UPDATE orders SET qunatity=($2), product_id=($3), user_id=($4), status=($5) = WHERE id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [
      o.id,
      o.quantity,
      o.product_id,
      o.user_id,
      o.status,
    ]);
    conn.release();
    return result.rows[0];
  }
  async delete(id: string): Promise<order> {
    const sql = "DELETE FROM orders WHERE id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }
}
