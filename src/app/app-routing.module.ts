import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ShippingComponent } from './shipping/shipping.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'shipping', component: ShippingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
