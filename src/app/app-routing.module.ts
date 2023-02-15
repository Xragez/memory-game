import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameComponent} from "./game/game.component";
import { LoginComponent } from './login/login.component';
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {AuthGuard} from "./guard/auth.guard";
import { HighScoresComponent } from './high-scores/high-scores.component';

const routes: Routes = [
    {path: '', component:MainMenuComponent, canActivate: [AuthGuard] },
    {path: 'game', component: GameComponent, canActivate: [AuthGuard] },
    {path: 'login', component: LoginComponent},
    {path: 'high-scores', component: HighScoresComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
