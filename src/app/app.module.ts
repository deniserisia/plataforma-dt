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
import { FormsModule } from '@angular/forms';
import { DividaTecnicaService } from './service/divida-tecnica.service';
import { ProjetoService } from './service/projeto.service';
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './service/token.interceptor';


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
    HttpClientModule,
    FormsModule,
    AdminModule,
    GerenteModule,
    BrowserAnimationsModule
  ],
  providers: [
    DividaTecnicaService,
    ProjetoService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
