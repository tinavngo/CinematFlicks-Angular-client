import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss']
})
export class GenreInfoComponent implements OnInit {

  /**
   * Creates an instance of GenreInfoComponent.
   * 
   * @param {object} data - The data passed into the dialog
   * @param {string} data.Name - The name of the genre
   * @param {string} data.Description - The description of the genre

   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

  public data: {
    Name: string,
    Description: string
  }
  ) {}

  ngOnInit(): void {
    
  }

}