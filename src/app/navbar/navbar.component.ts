import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginPopup } from '../home/home.component';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public popup: MatDialog, public commonService: CommonService, public router: Router, public authService: AuthService) { }
  ngOnInit(): void {
  }

  searchProducts(): any {
    console.log(this.commonService.getAllProductsReqObj, 'req obj');
    this.commonService.getAllProducts();
  }

  openLoginPopup(): any {
    const dialogConfig = {
      disableClose: false,
      width: '50%'
    }
    const p = this.popup.open(LoginPopup, dialogConfig);
    p.afterClosed().subscribe(
      (res: any) => {
        console.log(res)
      }
    )
  }

  openProfilePopup(): any {
    const dialogConfig = {
      disableClose: false,
      width: '50%'
    }
    const p = this.popup.open(ProfilePopup, dialogConfig);
    p.afterClosed().subscribe(
      (res: any) => {
        console.log(res)
      }
    )
  }

  navigateToCheckout(): any {
    this.commonService.cartItems = this.commonService.items.filter((item: any) => item.selected > 0);
    this.commonService.cartItems.map((it: any) => {
      if (it.selected > 0) {
        this.commonService.totalPrice = this.commonService.totalPrice + (it.selected * it.price)
        console.log(it.selected * it.price)
        console.log('total', this.commonService.totalPrice)
      }
    });
    console.log('total', this.commonService.totalPrice)
    this.router.navigate(['/checkout']);
  }

}

@Component({
  selector: 'app-profile',
  templateUrl: './profile-popup.html',
  styleUrls: ['./navbar.component.css']
})
export class ProfilePopup implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProfilePopup>, public authService: AuthService) {
    this.authService.emitter.subscribe((res: any) => {
      if (res === 'update_profile_success') {
        this.dialogRef.close();
      }
    })
  }

  ngOnInit(): void {
      this.authService.registerValidation.controls.name.setValue(this.authService.user.data.user_name);
      this.authService.registerValidation.controls.email.setValue(this.authService.user.data.user_email);
      this.authService.registerValidation.controls.mobile.setValue(this.authService.user.data.mobile);
      this.authService.registerValidation.controls.address.setValue(this.authService.user.data.address);
      this.authService.registerValidation.controls.email.disable();
  }

}