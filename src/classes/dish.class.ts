
import { randomUUID } from "node:crypto";
import IDish from "../interfaces/dish.interface";

export default class Dish {
    private _id!: string;
    private _name!: string;
    private _price!: number | 0;
    private _prepareTime!: number;

    constructor(name: string, price: number, prepareTime: number) {
        this._id = randomUUID();
        this._name = name;
        this._price = price;
        this._prepareTime = prepareTime;
    }

    public get id() {
        return this._id;
    }
    public get name() {
        return this._name;
    }
    public get price() {
        return this._price;
    }
    public get prepareTime() {
        return this._prepareTime;
    }

    public asJson(): IDish {
        return {
            id: this._id,
            name: this._name,
            price: this._price,
            prepareTime: this._prepareTime
        }
    }
}