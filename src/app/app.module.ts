import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import simplified API for Angular
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// import Angular material]
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';

// import site components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GenreInfoComponent } from './genre-info/genre-info.component';
import { DirectorInfoComponent } from './director-info/director-info.component';
import { SynopsisInfoComponent } from './synopsis-info/synopsis-info.component';
import { MovieCarouselComponent } from './movie-carousel/movie-carousel.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent},
  { path: 'movies', component: MovieCardComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix'}
]

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    GenreInfoComponent,
    DirectorInfoComponent,
    SynopsisInfoComponent,
    MovieCarouselComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
