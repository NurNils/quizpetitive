import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralComponent } from './pages/general/general.component';
import { HomeComponent } from './pages/general/home/home.component';
import { RoomComponent } from './pages/general/room/room.component';
import { RoomJoinComponent } from './pages/general/room-join/room-join.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './pages/general/game/game.component';
import { CardComponent } from './shared/components/card/card.component';
import { AdsComponent } from './shared/components/ads/ads.component';
import { CharacterComponent } from './shared/components/character/character.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './shared/components/header/header.component';
import { BoxComponent } from './shared/components/box/box.component';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { EndComponent } from './shared/components/end/end.component';
import { PlayerComponent } from './shared/components/player/player.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,

    /** Pages */
    GeneralComponent,
    HomeComponent,
    RoomComponent,
    RoomJoinComponent,
    GameComponent,
    CardComponent,
    CharacterComponent,

    HeaderComponent,
    BoxComponent,
    EndComponent,
    PlayerComponent,
    AdsComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot({url: environment.socket.baseUrl, options: {}}),
    AppRoutingModule,
    BrowserAnimationsModule,
    /** Material */
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
