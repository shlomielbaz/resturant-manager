import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares";

const bodyParser = require("body-parser");
const path = require("path");

import api from "./api";
import MessageResponse from "./interfaces/message.response";
import OrdersService from "./services/orders.service";
import TablesService from "./services/tables.service";
import DishesService from "./services/dishes.service";

require("dotenv").config();

const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'nonce-8IBTHwOdqNKAWeKl7plt8g=='"
  );
  next();
});

// app.use(morgan('dev'));
// app.use(helmet());
// app.use(cors());
// app.use(express.json());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/kitchen", function (req, res) {
  res.render("pages/kitchen", { orders: OrdersService.retrive() });
});

app.get("/resturant", function (req, res) {
  res.render("pages/resturant", { tables: TablesService.retrive() });
});

app.get("/orders/:key", async (req, res) => {
  const order = await OrdersService.getOrderById(req.params.key).asJson();
  
  res.render("pages/order-edit", { order: order, dishes: DishesService.retrive()});
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
