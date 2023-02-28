import express, { Request, Response } from "express";
import { user, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
const store = new UserStore();

const create = async (req: Request, res: Response) => {
  try {
    const user: user = {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json("User already exists");
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
  const users = await store.index();
  res.json(users);
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
  const user = await store.show(req.params.id);
  res.json(user);
};
const remove = async (req: Request, res: Response) => {
  try {
    console.log("remove");
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader!;
    jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const deleted = await store.delete(req.params.id);
  res.json("deleted");
};
const authenticate = async (req: Request, res: Response) => {
  const auser = await store.authenticate(req.body.id, req.body.password);
  var token = jwt.sign({ user: auser }, process.env.TOKEN_SECRET!);
  res.json(token);
};
const user_routes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.delete("/users/:id", remove);
  app.post("/users/authenticate", authenticate);
};
export default user_routes;
