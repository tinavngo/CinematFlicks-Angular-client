import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { trigger, style, animate, transition } from '@angular/animations';


/**
 * Component for displaying a carousel of movie images with fade animations.
 * The images rotate automatically, and users can manually navigate through them.
 */
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
  /**
   * Array of image URLs to be displayed in the carousel.
   * 
   * @type {string[]}
   */
  @Input() images: string[] = []; 
  currentIndex: number = 0;
  autoPlayInterval: any;

  /**
   * Creates an instance of MovieCarouselComponent
   * 
   * @param {FetchApiDataService} fetchApiData - Service for fetching movie data from CinematFlicks API
   */
  constructor(private fetchApiData: FetchApiDataService) { }

  /**
   * Angular's OnInit lifecycle hook.
   * Called after the component's data-bound properties have been initialized
   * Fetches movie images an starts the automatic rotation of images.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.fetchMovieImages(); 
    this.startAutoPlay(); 
  }

  /**
   * Angular's onDestroy lifecycle hook.
   * Called just before the component is destroyed.
   * Clears the interval for automatic image rotation to prevent memory leaks.
   * 
   * @returns {void}
   */
  ngOnDestroy(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval); // Clear interval on destroy
    }
  }

  /**
   * Fetches movie images from the API and stores the image paths in the `images` array.
   * 
   * @returns {void}
   */
  fetchMovieImages(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.images = movies.map(movie => movie.ImagePath); // Adjust based on API response
    });
  }

  /**
   * Advances the carousel to the next image.
   * Loops back to the first image if currently on the last image.
   * 
   * @returns {void}
   */
  next(): void {
    this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
  }

  /**
   * Starts the automatic image rotation with a specified interval
   * 
   * @returns {void}
   */
  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 3000); // Change image every 3 seconds
  }
}
