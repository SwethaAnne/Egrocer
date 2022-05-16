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
}
