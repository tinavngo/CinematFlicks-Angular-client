import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for handling user registration functionality
 * Displays a registration form and processes registration through the API.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password:'', Email: '', Birthday:'' };

  /**
   * Constructor injecting services for API calls, closing the dialog, and showing notifications.
   * 
   * @param {FetchApiDataService} fetchApiData - Service for making HTTP requests to the API.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Service to close the modal on success.
   * @param {MatSnackBar} snackBar - Service to show user notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /**
   * OnInit lifecycle hook for initialization logic, if needed.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
  }

  /**
   * Registers the user by sending their information to the API.
   * Closes the dialog and shows a success or failure message.
   * 
   * @returns {void}
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // logic for a successful user registration
      console.log(result);
      this.dialogRef.close(); // This will close the modal on success
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      // Logic for failed user registration
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
