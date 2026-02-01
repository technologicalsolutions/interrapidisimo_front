import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";

import { AppUsuario } from "../../models/dto/user/app-usuario";

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    private currentUserSubject: BehaviorSubject<AppUsuario | null>;
    public currentUser$: Observable<AppUsuario | null>;

    constructor(private router: Router) {
        const storedUser = localStorage.getItem('currentUser');
        const initialUser = storedUser ? JSON.parse(storedUser) : null;
        
        this.currentUserSubject = new BehaviorSubject<AppUsuario | null>(initialUser);
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    public get currentUserValueObservable(): Observable<AppUsuario | null> {
        return this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): AppUsuario | null {
        return this.currentUserSubject.value;
    }

    public setCuerrentUserValue(model: AppUsuario): void {
        localStorage.setItem('currentUser', JSON.stringify(model));
        this.currentUserSubject.next(model);
    }

    public clearUser(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    public logout(): void {
        this.clearUser();
        this.router.navigate(['/auth/login']);
    }

    public isSessionValid(): boolean {
        const userData = localStorage.getItem('currentUser');
        
        if (!userData) {
            return false;
        }

        try {
            const user: AppUsuario = JSON.parse(userData);
            
            if (!user.token || !user.token.expiracion) {
                return false;
            }

            const expirationDate = new Date(user.token.expiracion);
            const now = new Date();

            // Verificar si el token ha expirado
            return now < expirationDate;
        } catch (error) {
            console.error('Error al validar sesión:', error);
            return false;
        }
    }

    public getToken(): string | null {
        const user = this.currentUserValue;
        return user?.token?.token || null;
    }
    
}
