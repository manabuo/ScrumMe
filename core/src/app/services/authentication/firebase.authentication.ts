import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import { IAuthentication } from './IAuthentication';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { CanActivate, Router, } from '@angular/router';


/**
 * 
 * Clase pendiente de refactorización 
 * Promesas en angular2 => WRONG!  
 * Cambiar para usar observables
 */
@Injectable()
export class FirebaseAuthentication implements IAuthentication, CanActivate {


    constructor(public af: AngularFire, public auth: FirebaseAuth, public router: Router) { }



    public getUser() {
        this.auth.subscribe((auth) => {
            return auth;
        });
    }
 

    public signUp(email: string, password: string): any {
        let creds: any = { email: email, password: password };
        let res: Promise<boolean> = new Promise((resolve, reject) => {
            this.auth.createUser(creds).catch((err) => {
                let r = { provider: 3, error: err.message };
                return r;
            }).then(result => {
                    resolve(result);
                });
        });
        return res;

    }

    public login(email: string, password: string): any {
        let creds: any = { email: email, password: password };
        let res: Promise<boolean> = new Promise((resolve, reject) => {
            this.auth.login(creds).catch((err) => {
                let r = { provider: 3, error: err.message };
                console.log(err);
                return r;
            }).then(result => {
                resolve(result);
            });
        });
        return res;
    }



    public logout() {
        this.af.auth.logout();
    }

    public canActivate(): Observable<boolean> {
        return this.af.auth.take(1).map(auth => {
            if (!auth) {
                this.router.navigateByUrl('/login');
                return true;
            }
            return !!auth;
        });

    }

}
