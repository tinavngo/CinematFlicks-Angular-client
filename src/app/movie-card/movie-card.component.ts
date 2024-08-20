import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// info components
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisInfoComponent } from '../synopsis-info/synopsis-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  FavoriteMovies: any[] = [];
  isFavMovie: boolean = false;
  userData = { Username: "", FavoriteMovies: []};


  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

// Get ALL movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }


  // Boolean check to see if movie is in user's favorites
  isFavorite(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  getFavoriteMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log('Favorite movies:', this.FavoriteMovies);
  }

  // Add movie to favorites and notify user
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

  // Delete movie to favorites and notify user
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

  toggleIcon(movie: any): void {
    const isFavoriteMovie = this.isFavorite(movie);
    isFavoriteMovie
    ? this.deleteFavoriteMovie(movie)
    : this.addFavoriteMovie(movie);
  }

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
}

redirectProfile(): void {
    this.router.navigate(["profile"]);
}



showGenre(movie: any): void {
    this.dialog.open(GenreInfoComponent, {
        data: {
            Name: movie.Genre.Name,
            Description: movie.Genre.Description
        },
        width: "400px"
    })
}
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