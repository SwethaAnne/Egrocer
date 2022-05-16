import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sections: any = [
    {
      name: 'All Categories',
      type: 'all',
      selected: true
    },
    {
      name: 'Fruits',
      type: 'fruit',
      selected: false
    },
    {
      name: 'Seasonings and Spices',
      type: 'seasonings',
      selected: false
    },
    {
      name: 'Vegetables',
      type: 'vegetable',
      selected: false
    },
  ];

  name: any = '';

  category: any = {
    type: 'all'
  };


  constructor(public popup: MatDialog, public commonService: CommonService, public router: Router) { }

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts() {
    // if (this.category.type !== 'all') {
      this.commonService.getAllProductsReqObj.category = this.category.type;
    // }
    this.commonService.getAllProducts();
  }

  setCategory(index: any): any {
    this.sections.forEach((section: any, i: any) => {
      if (index === i) {
        section.selected = true;
      } else {
        section.selected = false;
      }
    });
    this.category = this.sections[index];
    console.log(this.category, 'category');
    this.commonService.category = this.category;
    this.searchProducts();
  }

  getItems(): any {
    let itemList = [];
    if (this.category.type === 'all') {
      itemList = this.commonService.items;
    } else {
      itemList = this.commonService.items.filter((item: any) => item.type === this.category.type);
    }
    // console.log(itemList)
    return itemList;
  }

}

@Component({
  selector: 'app-login',
  templateUrl: './login-popup.html',
  styleUrls: ['./home.component.css']
})
export class LoginPopup {

  currentStatus: string = 'login';
  constructor(public dialogRef: MatDialogRef<LoginPopup>, public authService: AuthService) {
    this.authService.emitter.subscribe((res: any) => {
      if (res === 'register_success' || res === 'login_success') {
        this.dialogRef.close();
      }
    })
  }

}