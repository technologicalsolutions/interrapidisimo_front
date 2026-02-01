
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES_custom } from './i18n/es-es-custom';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

// // components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/components/login/login.component";
import { AppRoutingModule } from './app.routes';
import { JwtInterceptor } from './models/interceptors/jwt-interceptor';

// // zorro-components
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { LOCALE_ID, NgModule } from '@angular/core';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { BookOutline, CheckCircleOutline, EyeInvisibleOutline, EyeOutline, LockOutline, MailOutline, TeamOutline, UserAddOutline, UserOutline } from '@ant-design/icons-angular/icons';


const ngZorroConfig: NzConfig = {
    tabs: {
        nzAnimated: false
    }
};

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NzTabsModule,
        BrowserModule,
        BrowserAnimationsModule,
        NgOptimizedImage,
        NzButtonModule,
        NzIconModule,
        NzFormModule,
        NzInputModule,
        NzSwitchModule,
        NzCheckboxModule,
        NzMessageModule,
        NzIconModule,
        NzIconModule.forRoot([
            UserOutline,
            LockOutline,
            MailOutline,
            EyeOutline,
            EyeInvisibleOutline,
            CheckCircleOutline,
            UserAddOutline,
            BookOutline,
            TeamOutline
        ]),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es' },
        { provide: NZ_I18N, useValue: es_ES_custom },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: NZ_CONFIG, useValue: ngZorroConfig },
        provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}