import { NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeCO from '@angular/common/locales/es-CO';

registerLocaleData(localeCO, 'co');

// //Routes
import { RouterLink } from "@angular/router";

// //ng-zorro
import { UserOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzColorPickerComponent } from 'ng-zorro-antd/color-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputGroupComponent, NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTextareaCountComponent } from "ng-zorro-antd/input";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDescriptionsModule  } from "ng-zorro-antd/descriptions";
import {  NzTreeViewModule } from 'ng-zorro-antd/tree-view';

//modulos
import { FullComponent } from './components/full/full.component';
import { PagesRoute } from "./pages.route";


@NgModule({
    declarations: [        
        FullComponent
        ],
    imports: [
        PagesRoute,
        RouterLink,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzModalModule,
        NzButtonModule,
        NzTypographyModule,
        NzDividerModule,
        NzCalendarModule,
        NzFlexModule,
        NzGridModule,
        NzLayoutModule,
        NzSpaceModule,
        NzAffixModule,
        NzBreadCrumbModule,
        NzCardModule,
        NzDropDownModule,
        NzMenuModule,
        NzTabsModule,
        NzEmptyModule,
        NzPageHeaderModule,
        NzPaginationModule,
        NzStepsModule,
        NzAutocompleteModule,
        NzCascaderModule,
        NzCheckboxModule,
        NzColorPickerModule,
        NzColorPickerComponent,
        NzDatePickerModule,
        NzFormModule,
        NzInputModule,
        NzInputNumberModule,
        NzMentionModule,
        NzRadioModule,
        NzRateModule,
        NzSelectModule,
        NzSliderModule,
        NzSwitchModule,
        NzTimePickerModule,
        NzTransferModule,
        NzTreeSelectModule,
        NzAvatarModule,
        NzBadgeModule,
        NzCommentModule,
        NzInputGroupComponent,
        NzTableModule,
        NzPopconfirmModule,
        NzCollapseModule,
        NzUploadModule,
        NzTextareaCountComponent,
        NzTabsModule,
        NzSpinModule,
        NzToolTipModule,
        NzDrawerModule,
        NzIconModule,
        NzDescriptionsModule,
        NzTreeViewModule,        
        NzIconModule.forRoot([UserOutline]),    
    ]
})

export class PagesModule {
}