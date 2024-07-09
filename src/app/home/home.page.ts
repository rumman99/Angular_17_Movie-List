import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  InfiniteScrollCustomEvent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonBadge,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    RouterLink,
    DatePipe,
    IonBadge,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon,
  ],
})
export class HomePage {
  private movieService = inject(MovieService);
  private currentPage = 1;
  private error = null;
  public isLoading = false;
  public allMovie: MovieResult[] = [];
  public imageUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/';

  constructor() {
    this.loadMovie();
  }

  loadMovie(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    if (!event) {
      this.isLoading = true;
    }

    this.movieService
      .getTopMovie(this.currentPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) {
            event.target.complete();
          }
        }),
        catchError((err: any) => {
          console.log(err);
          this.error = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          this.allMovie.push(...res.results);
          this.movieService.movieLlist.next(res.results);
          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        },
        error: (err) => {
          alert('Api Call Error' + err.error.message);
          this.error = err.message;
        },
        complete: () => {
          console.log('success!!!');
          this.isLoading = false;
          // this.movieService.movieLlist.subscribe((val) =>
          //   console.log('all movies: ', val)
          // );
        },
      });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovie(event);
  }
}
