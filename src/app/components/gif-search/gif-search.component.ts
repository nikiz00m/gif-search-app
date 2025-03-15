import { Component, HostListener, AfterViewInit } from '@angular/core';
import { GifService } from '../../services/gif.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-gif-search',
  standalone: true,
  templateUrl: './gif-search.component.html',
  styleUrls: ['./gif-search.component.css'],
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class GifSearchComponent implements AfterViewInit{
  searchQuery: string = '';
  gifs: any[] = [];
  limit: number = 10;
  offset: number = 0;
  isLoading: boolean = false;
  noResults: boolean = false;

  constructor(private gifService: GifService) {}

  ngAfterViewInit() {
    setTimeout(() => this.checkIfScrollNeeded(), 500);
  }

  searchGifs() {
    if (!this.searchQuery.trim()) return;
    this.offset = 0;
    this.gifs = [];
    this.noResults = false;
    this.loadMoreGifs();
  }

  loadMoreGifs() {
    if (this.isLoading) return;
    this.isLoading = true;

    this.gifService.searchGifs(this.searchQuery, this.limit, this.offset).subscribe(response => {
      if (response.data.length > 0) {
        this.gifs = [...this.gifs, ...response.data];
        this.offset += this.limit;

        setTimeout(() => this.checkIfScrollNeeded(), 500);
      } else if (this.gifs.length === 0) {
        this.noResults = true;
      }
      this.isLoading = false;
    });
  }

  downloadGif(url: string, filename: string = 'gif.gif') {
    fetch(url)
      .then(response => response.blob()) 
      .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href); 
      })
      .catch(error => console.error('Помилка завантаження GIF:', error));
  }

  copyLink(url: string) {
    navigator.clipboard.writeText(url);
    alert('Посилання скопійовано!');
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !this.isLoading) {
      this.loadMoreGifs();
    }
  }

  checkIfScrollNeeded() {
    if (document.body.scrollHeight <= window.innerHeight) {
      this.loadMoreGifs();
    }
  }
  
}
