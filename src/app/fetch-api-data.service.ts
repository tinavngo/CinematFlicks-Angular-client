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
  // Inject the HttpClient modules to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }



  // API call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  // an API call to get all movies from CinematFlicks API
  // and pass token in the HTTP header since this is a protected route
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

  // an API call to fetch a single movie
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

  // an API call to fetch a single director
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // an API call to fetch a single genre
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // an API call to fetch a single user
  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

    // an API call for getFavorites endpoint
    getFavorites(username: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + '/users/' + username,{
        headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          map((data) => data.FavoriteMovies),
          catchError(this.handleError)
        );
    }


    // an API call for addFavorites endpoint
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
      )}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // an APi call for deleteFavorites endpoint
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

    // an API call for editUser endpoint
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

    // an API call for deleteUser endpoint
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

    // error handling function
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

  // Non-typed response extraction for now
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }
}


