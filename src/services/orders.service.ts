import Dish from "../classes/dish.class";
import Order from "../classes/order.class";
import OrderStatus from "../enums/order-status.enum";
import IOrder from "../interfaces/order.interface";

export default class OrdersService {
  private static _orders: Record<string, Order> = {};
  private _total: number = 0;

  public static createOrder(tableNo: number): Order {
    const order: Order = new Order(tableNo);
    this._orders[order.id] = order;

    console.log(`A new order to table ${order.table.number} was ceated`);
    return order;
  }

  public static retrive(): IOrder[] {
    const orders: IOrder[] = [];
    for (const key in this._orders) {
      orders.push(this._orders[key].asJson());
    }
    return orders;
  }

  static getOrderById(id: string): Order {
    return this._orders[id];
  }

  public static displyOrders() {
    for (const key in this._orders) {
      console.log(this._orders[key].disply());
    }
  }

  public static addDish(key: string, dish: Dish) {
    if (key in this._orders) {
      this._orders[key].addDish(dish);
    }
  }

  public static updateStatus(key: string, status: OrderStatus) {
    if (key in this._orders) {
      this._orders[key].updateStatus(status);
    }
  }

  public static displyTotal() {
    // for(const key in this._orders) {
    //     this._total = this._total + this._orders[key].getTotal();
    // }
    // console.log(`Total daily ${this._total}`);
  }
}
