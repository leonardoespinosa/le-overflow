import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { environment } from '../../environments/environment';
import urlJoin from 'url-join';

@Injectable()
export class AuthService {
    userUrl: string;
    currentUser?: User;

    constructor(private http: Http,
        private router: Router,
        public snackBar: MatSnackBar) {
        this.userUrl = urlJoin(environment.apiUrl, 'auth');
        if (this.isLoggedIn()) {
            const { userId, email, firstName, lastName } = JSON.parse(localStorage.getItem('user'));
            this.currentUser = new User(email, null, firstName, lastName, userId);
        }
    }

    signup(user: User): Observable<any> {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(urlJoin(this.userUrl, 'signup'), body, { headers });
    }

    signin(user: User): Observable<any> {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(urlJoin(this.userUrl, 'signin'), body, { headers });
    }

    login = ({ token, userId, firstName, lastName, email }) => {
        this.currentUser = new User(email, null, firstName, lastName, userId);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ userId, firstName, lastName, email }));
        this.router.navigateByUrl('/');
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    logout() {
        localStorage.clear();
        this.currentUser = null;
        this.router.navigateByUrl('/signin');
    }

    showError(message) {
        this.snackBar.open(message, 'x', {
            duration: 2500,
        });
    }

    handleError(error: any) {
        const { error: { name }, message } = error;
        if ((name !== null && name !== undefined) && name === 'TokenExpiredError') {
            this.showError('Tu sesion ha expirado');
        } else if ((name !== null && name !== undefined) && name === 'JsonWebTokenError') {
            this.showError('Ha habido un problema con tu sesion');
        } else {
            this.showError(message || 'Ha ocurrido un error. Intentalo nuevamente.');
        }
        this.logout();
    }
}