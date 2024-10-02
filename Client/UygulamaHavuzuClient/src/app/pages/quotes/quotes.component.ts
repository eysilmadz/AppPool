import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.css'
})
export class QuotesComponent {
  
  quote: string = "Loading...";
  author: string = "";

  constructor(private http: HttpClient) {
    this.getRandomQuote();
  }

  getRandomQuote() {
    this.http.get<any>('http://localhost:5281/api/quotes/random').subscribe(response => {
      console.log(response)
      const fullQuote = response.quote;
      const splitQuote = fullQuote.split(" - ");
      this.quote = splitQuote[0];
      this.author = splitQuote[1];
    });
  }

  shareOnTwitter() {
    const twitterUrl = `https://twitter.com/intent/tweet?hashtags=Yazılım&text=${encodeURIComponent(this.quote + " - " + this.author)}`;
    window.open(twitterUrl, '_blank');
  }
}
