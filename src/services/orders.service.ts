import Order from "../classes/order.class";
import OrderStatus from "../enums/order-status.enum";
import IDish from "../interfaces/dish.interface";
import IOrder from "../interfaces/order.interface";


export default class OrdersService {
    private static _orders: Record<string, Order> = {};
    private _total: number = 0;

    public static createOrder(tableNo: number) : Order {
        const order: Order = new Order(tableNo);
        this._orders[order.id] = order;

        console.log(`A new order to table ${order.table} was ceated`)
        return order;
    }

    public static retrive() : IOrder[] {
        const orders: IOrder[] = [];
        for(const key in this._orders) {
            const order = this._orders[key];
            orders.push({
                id: order.id,
                dishes: order.dishes,
                table: order.table,
                total: order.getTotal(),
                comment: order.comment,
                status: OrderStatus[order.status]
            });
        }
        return orders;
    }

    public static displyOrders() {
        for(const key in this._orders) {
            console.log(this._orders[key].disply())
        }
    }

    public static addDish(key: string, dish: IDish) {
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