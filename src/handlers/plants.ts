import express, { Request, Response } from "express";
import { plant, PlantStore } from "../models/plant";

const store = new PlantStore();

const index = async (_req: Request, res: Response) => {
  const plants = await store.index();
  res.json(plants);
};

const show = async (req: Request, res: Response) => {
  const plant = await store.show(req.params.id);
  res.json(plant);
};

const create = async (req: Request, res: Response) => {
  try {
    const plant: plant = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
    };
    const newPlant = await store.create(plant);
    res.json(newPlant);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const plant_routes = (app: express.Application) => {
  app.get("/plants", index);
  app.get("/plants/:id", show);
  app.post("/plants", create);
  app.delete("/plants/:id", remove);
};
export default plant_routes;
