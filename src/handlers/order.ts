import express, { Request, Response } from "express";
import { order, OrderStore } from "../models/order";
import jwt from "jsonwebtoken";

const orderStore = new OrderStore();

const create = async (req: Request, res: Response) => {
  try {
    const order = {
      id: req.body.id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      status: req.body.status,
    };
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
