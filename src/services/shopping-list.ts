import { Ingredient } from './../models/ingredient';
export class ShoppingListService {
    private ingredient: Ingredient[] = [];

    addItem(name: string, amount: number) {
        this.ingredient.push(new Ingredient(name, amount));
        console.log(this.ingredient);
    }

    addItems(items: Ingredient[]) {
        this.ingredient.push(...items);
    }

    getItems() {
        return this.ingredient.slice();
    }

    removeItem(index: number) {
        this.ingredient.splice(index, 1);
    }
 }