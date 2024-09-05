import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss']
})
export class DirectorInfoComponent implements OnInit {


  /**
   * Creates an instance of DirectorInfoComponent.
   * 
   * @param {object} data - The data passed into the dialog
   * @param {string} data.Name - The name of the director
   * @param {string} data.Bio - The bio of the director
   * @param {string} data.Birth - The birth of the director
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

  public data: {
    Name: string,
    Bio: string,
    Birth: string,
  }
  ) {}


  /**
   * Angular's OnInit lifecycle hook.
   * Called after the component's data-bound properties have been initialized
   */
  ngOnInit(): void {
    
  }

}