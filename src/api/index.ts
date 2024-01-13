import express from 'express';

import OrdersService from '../services/orders.service';
import Order from '../classes/order.class';
import DishesService from '../services/dishes.service';

const router = express.Router();

router.post('/orders/add', (req, res) => {
  const {table} = req.body;
  const order = OrdersService.createOrder(table);
  res.status(200).json(order.asJson());
});

router.post('/orders/save', (req, res) => {
  const {id, dishes, status} = req.body;
  const order = OrdersService.getOrderById(id);
  
  if (order instanceof Order) {
    //order.status = eval(`OrderStatus.${status}`);
    
    dishes.forEach((id: string) => {
      const dish = DishesService.getDishById(id);
      order.addDish(dish);
    });
  }
});

export default router;
