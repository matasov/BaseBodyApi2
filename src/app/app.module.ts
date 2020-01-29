import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ApiService } from 'src/system/api.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from 'src/system/auth-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { BackgroundImageResolver } from 'src/system/resolvers/background-image.resolver';
// import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './_header/header.component';
import { SidebarComponent } from './_sidebar/sidebar.component';
import { FooterComponent } from './_footer/footer.component';
import { SelectroleComponent } from './selectrole/selectrole.component';
import { UserslistComponent } from './userslist/userslist.component';

import {
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaLoaderService,
  RecaptchaModule
} from 'ng-recaptcha';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

const globalSettings: RecaptchaSettings = { siteKey: '6LdlRaoUAAAAAEFKWLGFtyzXw57WCoJd_6r4NTa8' };
const appRoutes: Routes = [
  {
    path: '', component: LoginComponent, resolve: {
      background: BackgroundImageResolver
    }
  },
  // { path: 'selectrole', component: SelectroleComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UserslistComponent }
];

@NgModule({
  entryComponents: [LoginComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SelectroleComponent,
    UserslistComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,
      { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule.forRoot(),
  ],
  providers: [ApiService, CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: globalSettings,
    }, BackgroundImageResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
