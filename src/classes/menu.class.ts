import { dishes } from "../data/dishes.data";
import IDish from "../interfaces/dish.interface";

export default class Menu {
    private _dishes: IDish[] = dishes;


    public static displyMenu() {
        dishes.forEach(dish => console.log(dish.name));
    }
}