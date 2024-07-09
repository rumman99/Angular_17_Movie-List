import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonBadge,
  IonButton,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonCardContent,
} from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonHeader,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    RouterLink,
    DatePipe,
    IonBadge,
    IonButton,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonText,
    IonCardContent,
  ],
})
export class DetailsPage {
  private movieService = inject(MovieService);

  public imageUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/';
  public allMovie: WritableSignal<any | null> = signal(null);

  @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((singleMovie: any) => {
      console.log(singleMovie);
      this.allMovie.set(singleMovie);
    });
  }

  constructor() {}
}
