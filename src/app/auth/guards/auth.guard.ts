import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private AuthService:AuthService,
              private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.AuthService.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado=> {
        if(!estaAutenticado){
          this.router.navigate(['./auth/login']);
        }
        })
      );
      // if(this.AuthService.auth.id){
      //   return true;
      // }


      // console.log('Bloqueado por el AuthGuard  -canActivate');
      // return false;
  }


  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.AuthService.verificaAutenticacion()      .pipe(
        tap(estaAutenticado=> {
        if(!estaAutenticado){
          this.router.navigate(['./auth/login']);
        }
        })
      );

      // if(this.AuthService.auth.id){
      //   return true;
      // }

      // console.log('Bloqueado por el AuthGuard -canLoad');
      // return false;
  }
}
