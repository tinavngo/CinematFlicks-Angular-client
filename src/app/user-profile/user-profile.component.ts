import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Import to bring in the API call
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// Components
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisInfoComponent } from '../synopsis-info/synopsis-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() userData = { Username: "", Password: "", Email: "", Birthday: "", FavoriteMovies: []};
  FavoriteMovies: any[] = [];
  movies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }


    logout(): void {
      this.router.navigate(['welcome']);
      localStorage.removeItem("user");
    }

    redirectMovies(): void {
      this.router.navigate(["movies"]);
  }

  // Boolean check to see if movie is in user's favorites
  isFavorites(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  // Get user's favorite movies
  getFavorites(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
  }

  // Allow users to remove favorites from their profile
  deleteFavoriteMovie(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.deleteFavorites(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavorites();
      this.userProfile();
      this.snackBar.open('A movie has been deleted from your favorites.', 'OK', {
        duration:3000,
      });
    });
  }

  // Returns user information (username, email, birthday)
  userProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      console.log('User profile updated');
      localStorage.setItem('user', JSON.stringify(response));
      this.snackBar.open('Profile updated successfully', 'OK', {
        duration: 2000
      });
    });
  }

  deleteUser(): void {
    if (confirm('This action cannot be undone. Would you like to still proceed?')) {
      this.fetchApiData.deleteUser().subscribe((response) => {
        console.log('Deleted user', response);
        localStorage.clear();
        this.router.navigate(['welcome']);
      });
    }
  }

  // Moviecard components

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  showGenre(movie: any): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: movie.Genre.Name,
        Description: movie.Genre.Description
      },
    })
  }

  showDirector(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: movie.Director.Name,
        Bio: movie.Director.Bio,
        Birth: movie.Director.Birth
      },
      width:"400px"
    })
  }

  showDetail(movie: any): void {
    this.dialog.open(SynopsisInfoComponent, {
      data: {
        Title: movie.Title,
        Description: movie.Description,
        MPAARating: movie.MPAARating,
        ReleaseYear: movie.ReleaseYear
      },
      width: "400px"
    })
  }
}

