import {
  observable,
  makeObservable,
  action
} from 'mobx';

class SingleItemStore {
  name = null;
  description = null;
  id = null;
  price = 0;
  colors = [];
  pictures = [];
  sizes = [];
  rating = 0;
  category = null;


  constructor(opts) {
    makeObservable(this, {
      name: observable,
      description: observable,
      id: observable,
      price: observable,
      colors: observable,
      sizes: observable,
      pictures: observable,
      rating: observable,
      category: observable,
    });


    this.name = opts.name;
    this.description = opts.description;
    this.id = opts.id;
    this.price = opts.price;
    this.colors = opts.colors;
    this.pictures = opts.pictures;
    this.sizes = opts.sizes;
    this.rating = opts.rating;
    this.category = opts.category;
  }
}


export default SingleItemStore;