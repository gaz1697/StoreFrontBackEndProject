import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import user_routes from "./handlers/user";
import order_routes from "./handlers/order";
import product_routes from "./handlers/product";
import dashboard_routes from "./handlers/dashboard";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

const userRoutes = user_routes(app);
const orderRoutes = order_routes(app);
const productRoutes = product_routes(app);
const dashboardRoutes = dashboard_routes(app);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
