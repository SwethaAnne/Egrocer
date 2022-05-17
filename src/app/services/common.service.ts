import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  totalCartItems: number = 0;
  cartItems: any = [];
  items: any = [
    {
      name: 'Orange',
      price: 150,
      type: 'fruit',
      quantity: 10,
      selected: 0,
      path: '/assets/orange.png'
    },
    {
      name: 'Banana',
      price: 150,
      type: 'fruit',
      quantity: 10,
      selected: 0,
      path: '/assets/banana.jpg'
    },
    {
      name: 'Tomato',
      price: 150,
      type: 'vegetable',
      quantity: 10,
      selected: 0,
      path: '/assets/tomato.jpg'
    },
    {
      name: 'Bread',
      price: 150,
      type: 'bread',
      quantity: 10,
      selected: 0,
      path: '/assets/bread.jpg'
    },
    {
      name: 'Cauliflower',
      price: 150,
      type: 'vegetable',
      quantity: 10,
      selected: 0,
      path: '/assets/cauli.jpg'
    },
    {
      name: 'Coriander seeds',
      price: 150,
      type: 'seasonings',
      quantity: 10,
      selected: 0,
      path: '/assets/coriander.jpg'
    },
  ];
  totalPrice: any = 0;
  orderPlacedStatus: boolean = false;

  getAllProductsLoad: boolean = false;
  getAllProductsReqObj: any = {
    product_name: '',
    category: 'all'
  };
  getAllProductsResObj: any;

  category: any = {
    type: 'all'
  };
  name: any = '';

  getProductsInCartLoad: boolean = false;
  getProductsInCartReqObj: any;
  getProductsInCartResObj: any;

  addProductInCartLoad: boolean = false;
  addProductInCartReqObj: any;
  addProductInCartResObj: any;

  deleteProductFromCartLoad: boolean = false;
  deleteProductFromCartReqObj: any;
  deleteProductFromCartResObj: any;

  constructor() { }

  getAllProducts() {
    this.getAllProductsLoad = true;
    console.log(this.getAllProductsReqObj, 'req body');
    axios.post(environment.apiHost + '/product/all', this.getAllProductsReqObj)
    .then((res: any) => {
      console.log(res, 'products');
      this.getAllProductsResObj = res.data.products;
      this.getAllProductsLoad = false;
    })
    .catch((err: any) => {
      console.log(err, 'err while getting products');
      this.getAllProductsLoad = false;
    })
  }

  getProductsInCart() {
    this.getProductsInCartLoad = true;
    let user = JSON.parse(localStorage.getItem('user') || JSON.stringify({isLoggedIn: false, data: {}}));
    axios.get(environment.apiHost + '/cart/cart?user_id=' + user.user_id)
    .then((res: any) => {
      console.log(res, 'res get cart');
      this.getProductsInCartResObj = res.data.cart;
      this.getProductsInCartLoad = false;
    })
    .catch((err: any) => {
      console.log(err, 'err while getting cart');
      this.getProductsInCartLoad = false;
    })
  }

  addProductToCart() {
    this.addProductInCartLoad = true;
    axios.post(environment.apiHost + '/cart/addToCart', this.addProductInCartReqObj)
    .then((res: any) => {
      console.log(res, 'res add to cart');
      this.addProductInCartResObj = res.data.cart;
      this.getProductsInCart();
      this.addProductInCartLoad = false;
    })
    .catch((err: any) => {
      console.log(err, 'err while adding to cart');
      this.getProductsInCart();
      this.addProductInCartLoad = false;
    })
  }

  deleteProductFromCart() {
    this.deleteProductFromCartLoad = true;
    let user = JSON.parse(localStorage.getItem('user') || JSON.stringify({isLoggedIn: false, data: {}}));
    axios.delete(environment.apiHost + '/cart/deleteFromCart?user_id=' + user.user_id)
    .then((res: any) => {
      console.log(res, 'res delete from cart');
      this.deleteProductFromCartResObj = res.data.cart;
      this.getProductsInCart();
      this.deleteProductFromCartLoad = false;
    })
    .catch((err: any) => {
      console.log(err, 'err while deleting from cart');
      this.getProductsInCart();
      this.deleteProductFromCartLoad = false;
    })
  }

}
