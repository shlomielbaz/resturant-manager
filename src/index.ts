import app from "./app";
import Order from "./classes/order.class";
import OrdersService from "./services/orders.service";
import { Disply } from "./utils/disply.util";

import {dishes} from "./data/dishes.data";
import OrderStatus from "./enums/order-status.enum";

const port = process.env.PORT || 8080;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);

  // const orders = new OrdersService();

  const o1 = OrdersService.createOrder(4);
  o1.addDish(dishes[0])
  o1.addDish(dishes[1])

  console.log("\n");

  const o2 = OrdersService.createOrder(3);
  o2.addDish(dishes[1])
  o2.addDish(dishes[2])
  o2.addDish(dishes[3])
  o2.addDish(dishes[4])

  console.log("\n");

  const o3 = OrdersService.createOrder(7);
  OrdersService.displyOrders();

  console.log("\n");

  o2.updateStatus(OrderStatus.Ready);

  console.log("\n");

  OrdersService.displyOrders();

  console.log("\n");

  o2.updateStatus(OrderStatus.Done);

  console.log("\n");

  OrdersService.displyOrders();

  console.log("\n");

  OrdersService.displyTotal();

  /* eslint-enable no-console */
});


// new Disply("Disply Screen", ["Disply Menu", "Disply Kitchen Screen", "Disply Rstorant Screen", "Create Order"]).run().then((res) => console.log(res));