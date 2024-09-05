import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// Info components
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisInfoComponent } from '../synopsis-info/synopsis-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';

/**
 * Component for handling user login functionality
 * Displaying a login form and handles the login process through the API.
 */
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

  /**
   * Constructor for the UserLoginComponent
   * 
   * @param {FetchApiDataService} fetchApiData - Service for making API calls to login
   * @param {MatDialogRef<UserLoginFormComponent>} dialog - Dialog service for displaying movie information
   * @param {MatSnackBar} snackBar - Snack bar service for user notifications
   * @param {Router} router - Router for navigation
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  /**
   * OnInit lifecycle hook to load user profile and favorite movies when the component initializes.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.userProfile();
    this.getFavoriteMovies();
  }

  /**
   * Logs the user out by removing their data from localStorage and redirects to the welcome page.
   * 
   * @returns {void}
   */
    logout(): void {
      this.router.navigate(['welcome']);
      localStorage.removeItem("user");
    }

   /**
   * Redirects the user to the movies page.
   * 
   * @returns {void}
   */
    redirectMovies(): void {
      this.router.navigate(["movies"]);
  }

  /**
   * Checks if a movie is in the user's favorites list.
   * 
   * @param {any} movie - The movie object to check. 
   * @returns {boolean} True if the movie is a favorite, false otherwise
   */
  isFavorite(movie: any): boolean {
    return this.FavoriteMovies.includes(movie._id);
  }

  /**
   * Fetches all movies and filters them to update the list of favorite movies.
   * 
   * @returns {void}
   */
  updateFavoriteMoviesList(): void {
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes)
    });
  }

/**
   * Fetches the user's profile and favorite movies from the API.
   * 
   * @returns {void}
   */
getFavoriteMovies(): void {
  this.fetchApiData.getUser().subscribe((user: any) => {
    this.user = user;
    this.FavoriteMovies = user.FavoriteMovies;
    this.updateFavoriteMoviesList();
    console.log('Favorite movies:', this.FavoriteMovies);
  });
}


  /**
   * Removes a movie from the user's favorites and updates both the UI and localStorage.
   * 
   * @param {any} movie - The movie object to remove from favorites.
   * @returns {void}
   */
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
  

  /**
  * Fetches the user's profile information (username, email, birthday).
  * 
  * @returns {void}
  */
  userProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  /**
   * Updates the user's profile information.
   * 
   * @returns {void}
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      console.log('User profile updated');
      localStorage.setItem('user', JSON.stringify(response));
      this.snackBar.open('Profile updated successfully', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Deletes the user's account after confirming, and logs them out.
   * 
   * @returns {void}
   */
  deleteUser(): void {
    if (confirm('This action cannot be undone. Would you like to still proceed?')) {
      this.fetchApiData.deleteUser().subscribe((response) => {
        console.log('Deleted user', response);
        localStorage.clear();
        this.router.navigate(['welcome']);
      });
    }
  }

  
   /**
   * Fetches all movies from the API and stores them in the `movies` array.
   * 
   * @returns {void}
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens a dialog displaying genre information for a specific movie.
   * 
   * @param {any} movie - The movie object containing genre information.
   * @returns {void}
   */
  showGenre(movie: any): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: movie.Genre.Name,
        Description: movie.Genre.Description
      },
      width:"400px"
    })
  }

  /**
   * Opens a dialog displaying director information for a specific movie.
   * 
   * @param {any} movie - The movie object containing director information.
   * @returns {void}
   */
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

  /**
   * Opens a dialog displaying synopsis information for a specific movie.
   * 
   * @param {any} movie - The movie object containing synopsis information.
   * @returns {void}
   */
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

