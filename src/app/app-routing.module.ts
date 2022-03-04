import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ProdGuardService} from './guards/prod-guard.service';
import { DetailProductComponent } from './product/detail-product.component';
import { EditProductComponent } from './product/edit-product.component';
import { ListProductComponent } from './product/list-product.component';
import { NewProductComponent } from './product/new-product.component';
import { LoginGuard } from './guards/login.guard';
import { ShoppingcarComponent } from './product/shoppingcar/shoppingcar.component';
import { PopularproductComponent } from './product/popularproduct/popularproduct.component';
import { BuyComponent } from './product/buy/buy.component';
import { ProductxsizeComponent } from './product/productxsize/productxsize.component';



const routes: Routes = [
  {path: '',component: ListProductComponent},
  {path: 'login',component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'register',component: RegisterComponent,canActivate:[LoginGuard]},
  {path: 'popular', component: PopularproductComponent},
  {path: 'stock/:idProduct', component: ProductxsizeComponent, canActivate:[ProdGuardService],data:{expectedRol:['admin']}},
  {path: 'shopping',component:ShoppingcarComponent,canActivate:[ProdGuardService],data:{expectedRol:['user']}},
  {path: 'buy',component:BuyComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
