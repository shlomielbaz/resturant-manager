import express from "express";

import OrdersService from "../services/orders.service";
import Order from "../classes/order.class";
import DishesService from "../services/dishes.service";
import Dish from "../classes/dish.class";

const router = express.Router();

router.post("/orders/add", (req, res) => {
  const { table } = req.body;
  const order = OrdersService.createOrder(table);
  res.status(200).json(order.asJson());
});

router.post("/orders/save", (req, res) => {
  const { id, dishes } = req.body;
  const order = OrdersService.getOrderById(id);

  if (order instanceof Order) {
    const data = req.body;
    const ds: Dish[] = [];

    dishes.forEach((id: string) => {
      ds.push(DishesService.getDishById(id))
    });

    data.dishes = [...ds];
    order.update(data);

    res.sendStatus(200);
  }
});

export default router;
