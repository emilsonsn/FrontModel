import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorStateMatcher, ErrorStateMatcher as MaterialErrorStateMatcher, MAT_DATE_FORMATS } from '@angular/material/core';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorPtbr } from './config/paginator';
import { LayoutsModule } from './layouts/layouts.module';
import { ComponentsModule } from './components/components.module';
import { TablesModule } from './tables/tables.module';
import { DialogsModule } from './dialogs/dialogs.module';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
	align: 'left',
	allowNegative: true,
	decimal: ',',
	precision: 2,
	prefix: 'R$ ',
	suffix: '',
	thousands: '.'
};

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    NgbModule,
    DirectivesModule,
    PipesModule,
    RouterModule
  ],
  exports: [
    CurrencyMaskModule,
    NgbModule,
    DirectivesModule,
    PipesModule,
    RouterModule,
    LayoutsModule,
    ComponentsModule,
    TablesModule,
    DialogsModule
  ],
  providers: [
    { provide: MaterialErrorStateMatcher, useValue: new ErrorStateMatcher() },
    { provide: MatPaginatorIntl, useClass: PaginatorPtbr },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]
})
export class SharedModule { }
