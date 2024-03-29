import { randomUUID } from "crypto";
import OrderStatus from "../enums/order-status.enum";
import IDish from "../interfaces/dish.interface";
import Table from "./table.class";
import TablesService from "../services/tables.service";
import Dispatcher from "../utils/dispacher";
import Dish from "./dish.class";
import IOrder from "../interfaces/order.interface";
import DishesService from "../services/dishes.service";

class Order {
  private _id!: string;
  private _dishes: Dish[] = [];
  private _comment!: string;
  private _table!: Table;
  private _status: OrderStatus = OrderStatus.Create;

  constructor(tableNo: number) {
    this._id = randomUUID();
    this._table = TablesService.pickTable(tableNo);

    Dispatcher.subscribe("add-dish-to-order", (name: string, table: string) =>
      console.log(`Add dish ${name} to order in table ${table}`)
    );
    Dispatcher.subscribe("order-status-changed", (from: any, to: any) =>
      console.log(
        `Status order changed from '${OrderStatus[from]}' to '${OrderStatus[to]}'`
      )
    );
  }

  public get id() {
    return this._id;
  }

  public get table() {
    return this._table;
  }

  public get dishes() {
    return this._dishes;
  }

  public get comment() {
    return this._comment;
  }

  public get status() {
    return this._status;
  }

  public set status(status: OrderStatus) {
    this._status = status;
  }

  public asJson(): IOrder {
    return {
      id: this._id,
      dishes: [...this._dishes],
      table: this._table.number,
      total: this.getTotal(),
      comment: this._comment,
      status: this._status,
    };
  }

  public disply() {
    return `Order Table No.: ${this.table.number}, Dishes: ${
      this._dishes.length
    }, Status: ${OrderStatus[this._status]}`;
  }

  public addDish(dish: Dish) {
    this._dishes.push(dish);

    Dispatcher.dispatch("add-dish-to-order", [dish.name, this._table.number]);
  }

  public updateStatus(status: OrderStatus) {
    Dispatcher.dispatch("add-dish-to-order", [
      OrderStatus[this._status],
      OrderStatus[status],
    ]);

    this._status = status;
  }

  public getTotal() {
    return this._dishes.reduce((a, d2) => a + d2.price, 0);
  }

  public update(order: IOrder) {
    this._status = order.status;
    this._comment = order.comment || "";
    this._dishes = [];

    order.dishes.forEach((dish: IDish) => {
      this.addDish(DishesService.getDishById(dish.id));
    });
  }
}

export default Order;
