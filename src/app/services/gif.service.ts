import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {
  private apiKey = 'FjSLBVR9CszB93aRf8Zr4SA54KUAJ45B';
  private apiUrl = 'https://api.giphy.com/v1/gifs/search';

  constructor(private http: HttpClient) {}

  searchGifs(query: string, limit: number = 10, offset: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}?api_key=${this.apiKey}&q=${query}&limit=${limit}&offset=${offset}`);
  }
}
