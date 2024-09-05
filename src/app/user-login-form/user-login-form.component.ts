import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component for handling user login functionality
 * Displaying a login form and handles the login process through the API.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
  
  @Input() userData = { Username: "", Password: "" };

  /**
   * Constructor for the UserLoginComponent
   * 
   * @param {FetchApiDataService} fetchApiData - Service for making API calls to login
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to dialog being opened
   * @param {MatSnackBar} snackBar - Snack bar service for displaying notifications
   * @param {Router} router - Router for navigation after successful login
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Angular's OnInit lifecycle hook.
   * Currently no initialization logic is needed.
   * 
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Logs in the user by sending the login data (username and password) to the API
   * On success, stores the user data and token in localStorage, closes the login dialog,
   * displays a success message and refirects to them movies page.
   * On failure, displays an error message
   */
  logInUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user logn
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close();
      this.snackBar.open('User login successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies'])
    }, (result) => {
      // Logic for failed login
      this.snackBar.open('User login failed', 'OK', {
        duration: 2000
      });
    });
  }

}
