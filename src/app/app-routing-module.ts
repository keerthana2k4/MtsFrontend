import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetDetails } from './get-details/get-details';
import { GetBalance } from './get-balance/get-balance';
import { Accountinfo } from './accountinfo/accountinfo';
import { Login } from './login/login';
import { Transfer } from './transfer/transfer';
import { History } from './history/history';

const routes: Routes = [
  {path:'getdetails/:id',component:GetDetails},
  {path:'balance/:id',component:GetBalance},
  {path:'home',component:Accountinfo},
  {path:'transfer/:id',component:Transfer},
  {path:'history/:id',component:History},
  {path:'',component:Login}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
