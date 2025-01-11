import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../shared/services/user-service.service';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate{

    userRole : string = 'zz';
    isUserLoggedIn : boolean = false ;

    constructor(private userService : UserService , private router : Router) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        
        await this.userService.getLoggedInUser().then(
            (data)=>{
                this.userRole = data;
                this.isUserLoggedIn = true ;
            })

        const expectedRole = route.data['role'];
         
        if (!this.isUserLoggedIn || this.userRole !== expectedRole){
            if(this.userRole === "Customer"){
                this.router.navigate(['/access-denied']);
            }
            else{
                this.router.navigate(['/login']);
            }
            return false;
        }
        return true;
    }
}

