import { randomUUID } from "crypto";
import OrderStatus from "../enums/order-status.enum";
import IDish from "../interfaces/dish.interface";

class Order {
    private _id!: string;
    private _dishes: IDish[] = [];
    private _comment!: string;
    private _table!: number;
    private _status: OrderStatus = OrderStatus.Create;

    constructor(tableNo: number) {
        this._id = randomUUID();
        this._table = tableNo;
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

    public disply() {
        return `Order Table No.: ${this.table}, Dishes: ${this._dishes.length}, Status: ${OrderStatus[this._status]}`
    }

    public addDish(dish: IDish) {
       this._dishes.push(dish)

       console.log(`Add dish ${dish.name} to order in table ${this.table}`)
    }

    public updateStatus(status: OrderStatus) {
        console.log(`Status order changed from '${OrderStatus[this._status]}' to '${OrderStatus[status]}' in table ${this.table}`);

        this._status = status;
    }

    public getTotal() {
        return this._dishes.reduce((a, d2) => a + d2.price, 0)
    }
}


export default Order;