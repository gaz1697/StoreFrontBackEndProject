import client from "../database";

export class dashboardQ {
  // get all current/active orders
  async getUserActiveOrders(id: number): Promise<any> {
    try {
      const sql =
        "SELECT * FROM orders WHERE user_id =($1) and status = 'active'";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error finding orders. Error: ${err}`);
    }
  }
}
