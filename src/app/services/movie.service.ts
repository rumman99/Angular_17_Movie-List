import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResult, MovieResult } from './interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

const baseUrl= "https://api.themoviedb.org/3";
const api_key= environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private http= inject(HttpClient);
   movieLlist= new BehaviorSubject<MovieResult[]>([]);
   
  constructor() { }

  getTopMovie(page=1): Observable<ApiResult>{
    return this.http.get<ApiResult>(`${baseUrl}/movie/popular?page=${page}&api_key=${api_key}`)
  
  }

  getMovieDetails(id:string):Observable<MovieResult>{
    return this.http.get<MovieResult>(`${baseUrl}/movie/${id}?api_key=${api_key}`);
  }
}
