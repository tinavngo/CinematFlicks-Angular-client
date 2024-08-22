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
    this.userProfile();
    this.getFavoriteMovies();
  }


    logout(): void {
      this.router.navigate(['welcome']);
      localStorage.removeItem("user");
    }

    redirectMovies(): void {
      this.router.navigate(["movies"]);
  }

  // Boolean check to see if movie is in user's favorites
  isFavorite(movie: any): boolean {
    return this.FavoriteMovies.includes(movie._id);
  }

  updateFavoriteMoviesList(): void {
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes)
    });
  }

  // Get user's favorite movies
  // Get user's favorite movies
getFavoriteMovies(): void {
  this.fetchApiData.getUser().subscribe((user: any) => {
    this.user = user;
    this.FavoriteMovies = user.FavoriteMovies;
    this.updateFavoriteMoviesList();
    console.log('Favorite movies:', this.FavoriteMovies);
  });
}


  // Allow users to remove favorites from their profile
  deleteFavoriteMovie(movie: any): void {
    this.fetchApiData.deleteFavorites(movie).subscribe({
      next: (result) => {
        //Update the UI by removing the movie from FavoritesMovie array
        this.FavoriteMovies = this.FavoriteMovies.filter((favMovie: any) => favMovie._id !== movie._id);

        //Update user data in localStorage
        this.user.FavoriteMovies = this.user.FavoriteMovies.filter((id: string) => id !== movie._id);
        localStorage.setItem('user', JSON.stringify(this.user));

        // Open the snackbar to confirm deletion
        this.snackBar.open('A movie has been deleted from your favorites', 'OK', {
          duration: 3000
        });
        console.log('Movie successfully removed from favorites:', movie.Title);
      },
      error: (err) => {
        console.error('Error deleting favorite movie:', err);
        this.snackBar.open('Failed to remove movie from favorites', 'OK', {
          duration: 3000,
        });
      }
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
      width:"400px"
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

