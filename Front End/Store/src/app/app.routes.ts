import { Routes } from '@angular/router';
import { AllProductComponent } from './product/components/all-product/all-product.component';
import { ProductDetailsComponent } from './product/components/product-details/product-details.component';
import { CardsComponent } from './product/components/cards/cards.component';
import { NewProductComponent } from './product/components/new-product/new-product.component';
import { RegisterComponent } from './shared/components/registerRorAdmin/register.component';
import { LoginComponent } from './shared/components/login/login.component';
import { authGuard } from './Gaurds/RootGuard/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UserInfoComponent } from './shared/components/user-info/user-info.component';
import { DashboardComponent } from './admin/component/dashboard/dashboard.component';
import { AdminProductComponent } from './admin/component/admin-product/admin-product.component';
import { UpdateProductComponent } from './admin/component/update-product/update-product.component';
import { AdminUsersComponent } from './admin/component/admin-users/admin-users.component';
import { UpdateUserComponent } from './admin/component/update-user/update-user.component';
import { AdminOrderManagementComponent } from './admin/component/admin-order-management/admin-order-management.component';
import { UpdateOrderStatusComponentComponent } from './admin/component/update-order-status-component/update-order-status-component.component';
import { OrderDetailsComponent } from './admin/component/order-details/order-details.component';
import { RegisterForUserComponent } from './shared/components/register-for-user/register-for-user.component';
import { PaymentComponent } from './shared/components/payment/payment.component';
import { ThankYouComponent } from './product/components/thank-you/thank-you.component';
import { RoleGuard } from './Gaurds/RoleGaurd/roleGaurd';
import { AccessDeniedComponent } from './admin/component/access-denied/access-denied.component';

export const routes: Routes = [
    {path:"" , component :AllProductComponent},
    {path:"Home" ,component : AllProductComponent},
    {path:"AdminProduct" , component : AdminProductComponent , canActivate : [RoleGuard] , data: { role: 'Admin' }},
    {path:"RegisterUser" , component:RegisterForUserComponent},
    {path:"Payment" , component : PaymentComponent ,canActivate :[authGuard]},
    {path:"thankYou" , component : ThankYouComponent,canActivate :[authGuard]},
    {path:"UserInfo", component: UserInfoComponent , canActivate:[authGuard] },
    {path:"Products" , component :AllProductComponent},
    {path:"details" , component:ProductDetailsComponent},
    {path:"dashboard" , component:DashboardComponent , canActivate : [RoleGuard] , data: { role: 'Admin' }},
    {path:"adminUsers" ,component : AdminUsersComponent , canActivate : [RoleGuard] , data: { role: 'Admin' }},
    {path:"Card" , component : CardsComponent , canActivate :[authGuard]},
    {path:"Orders" , component : AdminOrderManagementComponent ,  canActivate : [RoleGuard] , data: { role: 'Admin' }},
    {path: 'order-details/:id', component: OrderDetailsComponent },
    {path:"UpdateStatus" , component : UpdateOrderStatusComponentComponent , canActivate : [RoleGuard] , data: { role: 'Admin' }},
    {path:"NewProduct" , component : NewProductComponent ,  canActivate : [RoleGuard] , data: { role: 'Admin' }},
    {path:"adminUpdateUser" , component : UpdateUserComponent ,  canActivate : [RoleGuard] , data: { role: 'Admin' }},
    {path:"Register" , component : RegisterComponent},
    {path:"updateProduct" , component : UpdateProductComponent , canActivate : [RoleGuard] , data: { role: 'Admin' }},
    {path:"login" , component: LoginComponent},
    {path:"Products/Product/:id" , component : ProductDetailsComponent},
    {path : "access-denied" , component : AccessDeniedComponent},
    {path:'**' , component : NotFoundComponent} 
];
