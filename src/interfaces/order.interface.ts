import OrderStatus from "../enums/order-status.enum";
import IDish from "./dish.interface";

export default interface IOrder {
    id: string;
    dishes: IDish[];
    table: number;
    total?: number;
    comment?: string;
    status: string;
}