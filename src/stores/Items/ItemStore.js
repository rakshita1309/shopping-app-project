import {
  observable,
  makeObservable,
  action,
  computed,
  values,
  remove,
} from 'mobx';

import SingleItemStore from './SingleItemStore';

class ItemStore {
  allItems = {};
  cartItems = ['ak', 'cm', 'aw'];
  wishListItems = ['bm', 'bk', 'cw'];

  constructor() {
    makeObservable(this, {
      allItems: observable,
      cartItems: observable,
      wishListItems: observable,
      items: computed,
      itemsForMen: computed,
      itemsForWomen: computed,
      itemsForKids: computed,
      addItem: action.bound,
      addItemToCart: action.bound,
      removeItemFromCart: action.bound,
      addItemToWishList: action.bound,
      removeItemFromWishList: action.bound
    });
  }


  addItems (items = []) {
    items.forEach(item => this.addItem(item));
  }

  addItem (item) {
    this.allItems[item.id] = new SingleItemStore(item);
  }

  addItemToWishList(itemId) {
    if (this.wishListItems.includes(itemId)) {
      return;
    }

    this.wishListItems.push(itemId);
  }

  removeItemFromWishList(itemId) {
    let newItems = this.wishListItems.filter(item => item !==itemId);

    this.wishListItems = newItems;
  }


  addItemToCart(itemId) {
    if (this.cartItems.includes(itemId)) {
      return;
    }

    this.cartItems.push(itemId);
  }

  removeItemFromCart(itemId) {
    let newItems = this.cartItems.filter(item => item !==itemId);

    this.cartItems = newItems;
  }

  get items () {
    return values(this.allItems);
  }

  get itemsForMen () {
    return values(this.allItems).filter(item => item.category === 'men');
  }

  get itemsForWomen () {
    return values(this.allItems).filter(item => item.category === 'women');
  }

  get itemsForKids () {
    return values(this.allItems).filter(item => item.category === 'kids');
  }

}


let store = new ItemStore();

export default store;