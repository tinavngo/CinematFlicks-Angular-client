import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://tinflicks-2bf7ff98613b.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class UserRegisterationService {
  // Inject the HttpClient modules to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { 
  }
  // API call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  // an API call to get all movies from CinematFlicks API
  // and pass token in the HTTP header since this is a protected route
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // an API call for getOneMovie endpoint
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // an API call for getDirector endpoint
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + directorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // an API call for getGenre endpoint
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // an API call for getUser endpoint
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'user/' + username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
    // an API call for getFavorites endpoint
    getFavorites(username: string, movieID: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'user/' + username + '/movies/' + movieID, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          map((data) => data.FavoriteMovies),
          catchError(this.handleError)
        );
    }

    // an API call for addFavorites endpoint
    addFavorites(username: string, movieID: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.post(apiUrl + 'user/' + username + '/movies/' + movieID, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // an APi call for deleteFavorites endpoint
    deleteFavorites(username: string, movieID: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.delete(apiUrl + 'user/' + username + '/movies/' + movieID, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // an API call for editUser endpoint
    editUser(username: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.put(apiUrl + 'user/' + username, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    // an API call for deleteUser endpoint
    deleteUser(username: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.delete(apiUrl + 'user/' + username, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }



  // Non-typed response extraction for now
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

    // error handling function
    private handleError(error: HttpErrorResponse): any {
      // if error is not ErrorEvent --> error occured on the server side
      if (error.error instanceof ErrorEvent) { 
        console.error('Some error occured:', error.error.message);
      } else {
        console.error(
          `Error Status code ${error.status}, ` +
          `Error body is: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    }
}


