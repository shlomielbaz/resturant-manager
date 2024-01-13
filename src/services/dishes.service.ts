import Dish from "../classes/dish.class";
import { dishes } from "../data/dishes.data";
import IDish from "../interfaces/dish.interface";

export default class DishesService {
    private static _dishes: Record<string, Dish> = {};

    static {
        console.log('initilizing menu..');

        dishes.forEach(d => {
            const dish =  new Dish(d.name, d.price, d.prepareTime);
            this._dishes[dish.id] = dish;
        })
    }

    public static displyMenu() {
        dishes.forEach(dish => console.log(dish.name, dish.price));
    }

    public static getDishByName(name: string) : Dish | undefined {
        return Object.values(this._dishes).find(dish => dish.name === name);
    }

    public static getDishById(id: string) : Dish {
        return this._dishes[id];
    }
    
    public static retrive(): IDish[] {
        const dishes: IDish[] = [];
        for (const key in this._dishes) {
            dishes.push(this._dishes[key].asJson());
        }
        return dishes;
      }
}