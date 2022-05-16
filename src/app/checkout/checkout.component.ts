import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

export interface Item {
  name: string;
  quantity: number;
  price: number;
  item: any;
  type: string;
  selected: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  displayedColumns: string[] = ['item', 'name', 'selected', 'price'];
  dataSource: any = this.commonService.cartItems;

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    console.log(this.dataSource)
  }

  clearShoppingCart(): any {
    this.commonService.cartItems = [];
    this.commonService.items.map((item: any) => item.selected = 0);
    this.commonService.totalCartItems = 0;
    this.dataSource = []
  }

  updateQuantity(item: any, operation: string): any {
    console.log(item);
    if (operation === 'add') {
      item.selected += 1;
      this.commonService.totalCartItems += 1;
    } else if (operation === 'subtract') {
      item.selected -= 1;
      this.commonService.totalCartItems -= 1;
    }
    this.commonService.cartItems.filter((it: any) => {
      if (it.name === item.name) {
        it = item;
      }
    });
    this.commonService.items.filter((it: any) => {
      if (it.name === item.name) {
        it = item;
      }
    });
    this.dataSource = this.commonService.cartItems.filter((it: any) => it.selected > 0);
    this.commonService.cartItems.map((it: any) => {
      if (it.selected > 0) {
        this.commonService.totalPrice = this.commonService.totalPrice + (it.selected * it.price)
      }
    })
    console.log('price total', this.commonService.totalPrice)
  }

}
