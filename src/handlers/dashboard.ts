import { dashboardQ } from "../services/dashboard";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const dashboard = new dashboardQ();

const getUserActiveOrders = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader!;
    jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const orders = await dashboard.getUserActiveOrders(parseInt(req.params.id));
  res.json(orders);
};

const dashboard_routes = (app: express.Application) => {
  app.get("/userOrders/:id", getUserActiveOrders);
};
export default dashboard_routes;
