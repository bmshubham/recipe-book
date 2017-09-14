import { Ingredient } from './../../models/ingredient';
import { ShoppingListService } from './../../services/shopping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(private navCtrl: NavController, private navParams: NavParams, private shoppingListService: ShoppingListService) {
  }

  onAddItem(form) {
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onRemoveItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  private loadItems() {
    this.listItems = this.shoppingListService.getItems();
  }

}
