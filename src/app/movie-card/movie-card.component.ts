import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Info components
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisInfoComponent } from '../synopsis-info/synopsis-info.component';

/**
 * Component to display a list of movie cards
 * Provides functionality to view movie dialogs, manage favorite movies, and interact with toggle
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];     // Array to hold the list of movies fetched from the API.
  user: any = {};     // Holds the user's profile data.
  FavoriteMovies: any[] = [];     // Array to store the user's favorite movies.
  isFavMovie: boolean = false;      // Boolean to indicate whether a movie is in the user's favorites list.
  userData = { Username: "", FavoriteMovies: []};     // Object to store user data, including their username and favorite movies.


  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }


  /**
   * Retrieves a list of ALL movies from CinematFlicks API
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }


  /**
   * Checks if a movie is in the user's favorites
   * 
   * @param {any} movie - movie to check 
   * @returns {boolean} - True if the movie is in the user's favorites otherwise false
   */
  isFavorite(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Retrieves the user's favorite movies from the API and updates the `FavoriteMovies` array
   * 
   * @returns {void}
   */
  getFavoriteMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log('Favorite movies:', this.FavoriteMovies);
  }

  /**
   * Add movie to user's favorites and displays notification
   * 
   * @param {any} movie - Post favorite movie to user's favorites
   */
  addFavoriteMovie(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.addFavorites(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavoriteMovies();
      this.snackBar.open('A movie has been added to your favorites.', 'OK', {
        duration:3000,
      });
    });
  }

  /**
   * Delete movie from user's favorites and displays notification
   * 
   * @param {any} movie - Delete favorite movie from user's favorites 
   * @returns {void}
   */
  deleteFavoriteMovie(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.deleteFavorites(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavoriteMovies();
      this.snackBar.open('A movie has been deleted from your favorites.', 'OK', {
        duration:3000,
      });
    });
  }

  /**
   * Toggles from adding and deleting favorite movie from user's favorites
   * 
   * @param {any} movie - Update favorites in user's favorites
   * @returns {void}
   */
  toggleIcon(movie: any): void {
    const isFavoriteMovie = this.isFavorite(movie);
    isFavoriteMovie
    ? this.deleteFavoriteMovie(movie)
    : this.addFavoriteMovie(movie);
  }

  /**
   * Logs user out and navigates back to homepage
   * 
   * @returns {void}
   */
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
}

/**
 * Redirects the user to their profile
 * 
 * @returns {void}
 */
redirectProfile(): void {
    this.router.navigate(["profile"]);
}


/**
 * Opens dialog to show the genre information for the selected movie
 * 
 * @param {any} movie - The movie whose genre information will be displayed 
 * @returns {void}
 */
showGenre(movie: any): void {
    this.dialog.open(GenreInfoComponent, {
        data: {
            Name: movie.Genre.Name,
            Description: movie.Genre.Description
        },
        width: "400px"
    })
}

/**
 * Opens dialog to show the director information for the selected movie
 * 
 * @param {any} movie - The movei whose director information will be displayed.
 * @returns {void}
 */
showDirector(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
        data: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birth: movie.Director.Birth
        },
        width: "400px"
    })
}

/**
 * Opens dialog to show the the synopsis of the selected movie.
 * @param {any} movie - The movies whos synopsis will be displayed 
 * @returns {void}
 */
showDetail(movie: any): void {
    this.dialog.open(SynopsisInfoComponent, {
        data: {
          Title: movie.Title,
          Description: movie.Description,
          MPAARating: movie.MPAARating,
          ReleaseYear: movie.ReleaseYear,
        },
        width: "400px"
    })
}
}