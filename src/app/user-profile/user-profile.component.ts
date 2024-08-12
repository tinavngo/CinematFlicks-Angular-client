import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

// Import to bring in the API call
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userProfile();
    this.getFavorites();
  }


    logout(): void {
      this.router.navigate(['welcome']);
      localStorage.removeItem("user");
    }

    redirectMovies(): void {
      this.router.navigate(["movies"]);
  }

  isFavorites(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  userProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Password = this.user.Password;
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

  getFavorites(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log(`Here are the favorite movies for this user: ${this.FavoriteMovies}`);
  }
}
