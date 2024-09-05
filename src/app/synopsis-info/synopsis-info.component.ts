import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying movie synopsis
 */
@Component({
  selector: 'app-synopsis-info',
  templateUrl: './synopsis-info.component.html',
  styleUrls: ['./synopsis-info.component.scss']
})
export class SynopsisInfoComponent implements OnInit {

  /**
   * Creates an instance of GenreInfoComponent.
   * 
   * @param {object} data - The data passed into the dialog
   * @param {string} data.Title - The title of the movie
   * @param {string} data.Description - The description of the movie
   * @param {string} data.MPAARating - The MPAARating of the movie
   * @param {string} data.ReleaseYear - The release year of the movie
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Title: string,
      Description: string,
      MPAARating: string,
      ReleaseYear: string,
    }
  ) { }

  /**
   * Angular's OnInit lifecycle hook.
   * Called after the component's data-bound properties have been initialized
   */
  ngOnInit(): void {
  }

}
