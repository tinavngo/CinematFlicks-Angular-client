import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component representing the welcome page.
 * Provides options to open registration and login dialogs.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {

  /**
   * Constructor injecting the MatDialog service for opening modal dialogs.
   * 
   * @param {MatDialog} dialog - Service for opening dialogs.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * OnInit lifecycle hook for initialization logic, if needed.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
  }

  /**
   * Opens the user registration dialog by displaying the UserRegistrationFormComponent.
   * 
   * @returns {void}
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog by displaying the UserLoginFormComponent.
   * 
   * @returns {void}
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}