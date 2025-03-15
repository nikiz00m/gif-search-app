import { Component } from '@angular/core';
import { GifSearchComponent } from './components/gif-search/gif-search.component';

@Component({
  selector: 'app-root',
  imports: [GifSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gif-search-app-1';
}
