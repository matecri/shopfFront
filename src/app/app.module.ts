import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProductComponent } from './product/list-product.component';
import { DetailProductComponent } from './product/detail-product.component';
import { NewProductComponent } from './product/new-product.component';
import { EditProductComponent } from './product/edit-product.component';
import{HttpClientModule}from'@angular/common/http';
import{FormsModule}from'@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import{MatRadioModule}from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import { interceptorProvider } from './interceptor/prod-interceptor.service';
// externals
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './menu/footer.component';
import { ShoppingcarComponent } from './product/shoppingcar/shoppingcar.component';
import { DeleteconfirComponent } from './product/deleteconfir/deleteconfir.component';
import { PopularproductComponent } from './product/popularproduct/popularproduct.component';
import { BuyComponent } from './product/buy/buy.component';
import { ItemupdateComponent } from './product/itemupdate/itemupdate.component';
import { ProductxsizeComponent } from './product/productxsize/productxsize.component';
import { NewProductxsizeComponent } from './product/new-productxsize/new-productxsize.component';
import { EditproductxsizeComponent } from './product/editproductxsize/editproductxsize.component';



@NgModule({
  declarations: [
    AppComponent,
    ListProductComponent,
    DetailProductComponent,
    NewProductComponent,
    EditProductComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    FooterComponent,
    ShoppingcarComponent,
    DeleteconfirComponent,
    PopularproductComponent,
    BuyComponent,
    ItemupdateComponent,
    ProductxsizeComponent,
    NewProductxsizeComponent,
    EditproductxsizeComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatPaginatorModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
