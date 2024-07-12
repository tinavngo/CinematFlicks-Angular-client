import { Component, OnInit, Input } from '@angular/core';

// imported to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// imported to bring in the API calls
import { UserRegisterationService } from '../fetch-api-data.service';

// imported to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  // Input Decorator & pass userData to register user service
  @Input() userData = { Username: '', Password:'', Email: '', Birthday:'' };

  constructor(
    public fetchApiData: UserRegisterationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // function for registering a user
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // logic for a successful user registration
      console.log(result);
      this.dialogRef.close(); // This will close the modal on success
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
