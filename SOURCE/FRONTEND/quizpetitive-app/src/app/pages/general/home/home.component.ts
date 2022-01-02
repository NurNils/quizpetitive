import { Component, OnInit } from '@angular/core';
import { TitleMetaService } from '../../../shared/services/title-meta/title-meta.service';
import { DataService } from 'src/app/shared/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(titleMetaService: TitleMetaService, private dataService: DataService) { 
    titleMetaService.init('Startseite', 'Beschreibung der Startseite', 'quizpetitive, home, startseite, quiz, game, start');
  }

  ngOnInit(): void {
    this.dataService.gameNotFound = false;
  }

}
