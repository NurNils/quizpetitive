import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './pages/general/general.component';
import { HomeComponent } from './pages/general/home/home.component';
import { RoomComponent } from './pages/general/room/room.component';
import { RoomJoinComponent } from './pages/general/room-join/room-join.component';
import { GameComponent } from './pages/general/game/game.component';

const routes: Routes = [
  {
    component: GeneralComponent,
    path: '',
    children: [
      {
        component: HomeComponent,
        path: ''
      },
      {
        component: GameComponent,
        path: 'game'
      },
      {
        component: RoomComponent,
        path: 'room/:id'
      },
      {
        component: RoomComponent,
        path: 'room'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
