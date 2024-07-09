import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonImg, IonChip } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
  standalone: true,
  imports: [IonChip, 
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
    ReactiveFormsModule,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    JsonPipe
  ],
})
export class WishlistPage implements OnInit {
  private movieService = inject(MovieService);

  public movieListOption: any;
  public submitList: any = [];

  wishListForm: FormGroup = new FormGroup({});
  constructor() {
  }

  ngOnInit() {
    this.wishListForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
      movie: new FormControl('', Validators.required),
    });

    this.movieService.movieLlist.subscribe((data) => {
      this.movieListOption = data;
      // console.log(this.movieListOption)
    });
  }

  submitWishListForm() {
    const poster = this.movieListOption.find(
      (imagePath: any) => imagePath.title === this.wishListForm.value.movie
    );
    const formData = {
      name: this.wishListForm.value.name,
      email: this.wishListForm.value.email,
      message: this.wishListForm.value.message,
      movie: this.wishListForm.value.movie,
      poster: poster.poster_path,
    };
    this.submitList.push(formData);
    // alert(`Name: ${this.wishListForm.value.name}, Email: ${this.wishListForm.value.email}, Message: ${this.wishListForm.value.message}, Category: ${this.wishListForm.value.category}`)
  }
}
