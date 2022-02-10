import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Book} from "./book";
import { Observable, throwError } from 'rxjs';
import {retry, catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  apiUrl = "https://us-central1-bookshelf-dc-85ff6.cloudfunctions.net"

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  getBooks(): Observable<Book>{
    return this.http.get<Book>(this.apiUrl + "/getBooks")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  addBook(title : string, author: string) : Observable<Book>{
    return this.http.post<Book>(this.apiUrl + "/addBook?title=" + title + "&author=" + author, null)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteBook(id: string): Observable<Book>{
    return this.http.delete<Book>(this.apiUrl + "/deleteBook?id=" + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error : any){
    let errorMsg = "";
    if (error.error instanceof ErrorEvent){
      errorMsg = error.error.message;
    } else {
      errorMsg = `Error code ${error.status}` + "  " + `Message: ${error.message}`;
    }
    window.alert(errorMsg);
    return throwError(errorMsg);
  }
}
