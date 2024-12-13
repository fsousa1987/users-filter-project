import {NgModule} from '@angular/core';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {UserDetailsComponent} from './user-details/user-details.component';
import {FilterComponent} from './filter/filter.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatButton} from '@angular/material/button';

@NgModule({
  declarations: [
    UserDetailsComponent,
    FilterComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    MatButton
  ],
  exports: [
    UserDetailsComponent,
    FilterComponent
  ]
})
export class ComponentsModule {

}
