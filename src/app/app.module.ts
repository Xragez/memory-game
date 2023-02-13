import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './game/game.component';
import { CardComponent } from './game/card/card.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { HighScoresComponent } from './high-scores/high-scores.component';


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    GameComponent,
    CardComponent,
    LoginComponent,
    HeaderComponent,
    HighScoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'memory-game'),
    AngularFireDatabaseModule,
    FontAwesomeModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
