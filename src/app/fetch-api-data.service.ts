import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://tinflicks-2bf7ff98613b.herokuapp.com';
//This Injectable code tells Angular that this service will be avaiable everywhere, ie 'root'
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  /**
   * @constructor
   * @param http - Make HTTP requests 
   */

  constructor(private http: HttpClient) { }



  /**
   * API call to make user registration
   * @param {any} userDetails - New data being emitted for registration 
   * @returns {Observable<any>} - Subscribe and recieve notifications for registration
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  /**
   * API call to allow users to login with existing data
   * @param userDetails - Existing data being emitted for login
   * @returns {Observable<any>} - Subscribe and recieve notifications for login
   */
  
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  /**
   * API call to get ALL movies from CinematFlicks API
   * @returns {Observable<any>} - Handle AJAX requests and responses
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies/', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * API call to get ONE movie from CinematFlicks API
   * @param {string} title - Fetch one movie title 
   * @returns  {Observable<any>} - Handle AJAX requests and responses
   */

  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * API call to get ONE director from CinematFlicks API
   * @param {string} directorName - Fetch one director name 
   * @returns  {Observable<any>} - Handle AJAX requests and responses
   */

  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * API call to get ONE genre from CinematFlicks API
   * @param {string} genreName - Fetch one genre name 
   * @returns {Observable<any>} - Handle AJAX requests and responses
   */

  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * API call to get ONE user from CinematFlicks API
   * @returns  {Observable<any>} - Handle AJAX requests and responses
   */

  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }


  /**
   * API call to get ALL favorites from CinematFlicks API
   * @param {string} username - Fetch all favorites from username
   * @returns {Observable<any>} - Handle AJAX requests and responses
   */

  getFavorites(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }


  /**
   * API call to post ONE favorite to CinematFlicks API
   * @param {any} movie - Post one favorite to user profile 
   * @returns {Observable<any>} - Subscribe and receive notifications for favorites
   */

  addFavorites(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie);
    console.log('in fetch api service_id: ', movie._id);
    return this.http.post(apiUrl + '/users/' + user.Username + '/movies/' + movie._id, null, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * API call to remove ONE favorite to Cinematflicks API
   * @param {any} movie - Remove one favorite from user profile 
   * @returns {Observable<any>} - Subscribe and recieve notifications for user's favorites
   */

  deleteFavorites(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + '/users/' + user.Username + '/movies/' + movie._id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * API call to put userDetails in CinematFlicks API
   * @param {any} userDetails - Update userDetails in user profile
   * @returns {Observable<any>} - Subscribe and recieve notifications in user's favorites
   */

  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + '/users/' + userDetails.Username, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * API call to delete userDetails in CinematFlicks API
   * @returns {Observable<any>} - Handle AJAX requests and responses
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + '/users/' + user.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  
  /**
   * Handle HTTP errors
   * @param {HttpErrorResponse} error - HTTP error response 
   * @returns {any} - Error details
   */

  private handleError(error: HttpErrorResponse): any {
    // if error is not ErrorEvent --> error occured on the server side
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  /**
   * Non-types response extraction
   * @param {Response} res - API response 
   * @returns {any} - Extracted response data
   */
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }
}


