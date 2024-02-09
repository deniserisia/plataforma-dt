import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminModule } from './modules/admin/admin.module';
import { GerenteModule } from './modules/gerente/gerente.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateModule } from './template/template.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    AdminModule,
    GerenteModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
