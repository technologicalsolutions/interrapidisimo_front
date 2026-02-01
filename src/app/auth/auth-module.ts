import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';

import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES_custom } from '../i18n/es-es-custom';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

// Routes
import { Authroute } from "./auth.route";
import { RouterLink } from "@angular/router";

//modulos
import { RegisterComponent } from './components/register/register.component';

//ng-zorro
import { NzConfig, NZ_CONFIG } from "ng-zorro-antd/core/config";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BookOutline, CheckCircleOutline, EyeInvisibleOutline, EyeOutline, LockOutline, MailOutline, TeamOutline, UserAddOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzMessageModule } from "ng-zorro-antd/message";



const ngZorroConfig: NzConfig = {
    tabs: {
        nzAnimated: false
    }
};

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        Authroute,
        RouterLink,
        CommonModule,
        ReactiveFormsModule,
        NzFormModule,
        NzButtonModule,
        NzInputModule,
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
        { provide: NZ_CONFIG, useValue: ngZorroConfig },
        provideAnimationsAsync(),
    ]
})

export class AuthModule {
}
