import express, { Request, Response } from "express";
import { order, OrderStore } from "../models/order";
import jwt from "jsonwebtoken";

const orderStore = new OrderStore();

const create = async (req: Request, res: Response) => {
  try {
    const order: order[] = req.body.order;
    const newOrder = await orderStore.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json("there was a problem creating the order");
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader!;
    jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const orders = await orderStore.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader!;
    jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const orders = await orderStore.show(req.params.id);
  res.json(orders);
};

const update = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader!;
    jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const order: order = req.body;
  const updatedOrder = await orderStore.update(order);
  res.json(updatedOrder);
};

const destroy = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader!;
    jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const deleted = await orderStore.delete(req.params.id);
  res.json(deleted);
};

const order_routes = (app: express.Application) => {
  app.post("/orders", create);
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.put("/orders", update);
  app.delete("/orders/:id", destroy);
};

export default order_routes;
