import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// info components
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieSynopsisComponent } from '../synopsis-info/synopsis-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  FavoriteMovies: any[] = [];
  isFavoriteMovie: boolean = false;
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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }



  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
}

redirectProfile(): void {
    this.router.navigate(["profile"]);
}

modifyFavoriteMovies(movie: any): void {
  const userJson = localStorage.getitem('user');
  if (!userJson) return;

    let user = JSON.parse(localStorage.getItem("user") || "");
    let icon = document.getElementById(`${movie._id}-favorite-icon`);

    if (user.FavoriteMovies.includes(movie._id)) {
        this.fetchApiData.deleteFavorites(movie).subscribe(res => {
            icon?.setAttribute("fontIcon", "favorite_border");

            console.log("delete success")
            console.log(res);
            user.FavoriteMovies = res.FavoriteMovies;
            localStorage.setItem("user", JSON.stringify(user));
        }, err => {
            console.error(err)
        })
    } else {

        this.fetchApiData.addFavorites(movie).subscribe(res => {
            icon?.setAttribute("fontIcon", "favorite");

            console.log("add success")
            console.log(res);
            user.FavoriteMovies = res.FavoriteMovies;
            localStorage.setItem("user", JSON.stringify(user));
        }, err => {
            console.error(err)
        })
    }
    localStorage.setItem("user", JSON.stringify(user));
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
    this.dialog.open(MovieSynopsisComponent, {
        data: {
          Title: movie.Title,
          Summary: movie.Description,
          MPAARating: movie.MPAARating,
          ReleaseYear: movie.ReleaseYear,
        },
        width: "400px"
    })
}
}