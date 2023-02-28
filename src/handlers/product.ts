import express, { Request, Response } from "express";
import { product, ProductStore } from "../models/product";
import jwt from "jsonwebtoken";

const productStore = new ProductStore();

const index = async (req: Request, res: Response) => {
  const products = await productStore.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await productStore.show(req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: product = req.body;
    const newProduct = await productStore.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json("there was a problem creating the product");
  }
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
  const product: product = req.body;
  const updatedProduct = await productStore.update(product);
  res.json(updatedProduct);
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
  const deleted = await productStore.delete(req.params.id);
  res.json(deleted);
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
  app.put("/products", update);
  app.delete("/products/:id", destroy);
};

export default product_routes;
