import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TitleMetaService {

  constructor(private title: Title, private meta: Meta) { }

  init(title: string, description: string, keywords: string) {
    this.setTitle(title);
    this.setMetaDescription(description);
    this.setMetaKeywords(keywords);
  }

  setTitle(title: string) {
    this.title.setTitle(`${title} - Quizpetitive`);
  }
  
  setMetaDescription(description: string) {
    this.meta.updateTag({
      name: 'description',
      content: description
    });
  }

  setMetaKeywords(keywords: string) {
    this.meta.updateTag({
      name: 'keywords',
      content: keywords
    });
  }
}
