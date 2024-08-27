import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('800ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MovieCarouselComponent implements OnInit, OnDestroy {
  @Input() images: string[] = []; // Array to hold image URLs
  currentIndex: number = 0;
  autoPlayInterval: any;

  constructor(private fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.fetchMovieImages(); // Fetch images when the component initializes
    this.startAutoPlay(); // Start automatic rotation
  }

  ngOnDestroy(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval); // Clear interval on destroy
    }
  }

  fetchMovieImages(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.images = movies.map(movie => movie.ImagePath); // Adjust based on API response
    });
  }

  next(): void {
    this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 3000); // Change image every 3 seconds
  }
}
