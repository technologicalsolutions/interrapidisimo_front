import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/components/login/login.component";
import { FullComponent } from "./pages/components/full/full.component";

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: LoginComponent },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'auth', loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule) },
    {
        path: 'home', component: FullComponent,
        children: [
            { path: '', loadChildren: () => import('./pages/pages-module').then((m) => m.PagesModule) }
        ]
    },
    { path: '**', redirectTo: 'home' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule { }