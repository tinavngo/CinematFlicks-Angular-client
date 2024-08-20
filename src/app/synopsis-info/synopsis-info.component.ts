import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-info',
  templateUrl: './synopsis-info.component.html',
  styleUrls: ['./synopsis-info.component.scss']
})
export class SynopsisInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Title: string,
      Description: string,
      MPAARating: string,
      ReleaseYear: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
