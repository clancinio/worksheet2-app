import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from './firebase-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  MyBooks: any = [];
  titleValue = "";
  authorValue = "";


  constructor(public firebaseApiService: FirebaseApiService){}

  ngOnInit(){
      this.loadBooks();
  }

  loadBooks() {
    return this.firebaseApiService.getBooks().subscribe((data: {}) => {
      this.MyBooks = data;
    })
  }

  addBook(){
    return this.firebaseApiService.addBook(this.titleValue, this.authorValue)
      .subscribe((data:{}) => {
        this.MyBooks = data;
        this.authorValue="";
        this.titleValue="";
      })
  }

  deleteBook(id: string){
    return this.firebaseApiService.deleteBook(id).subscribe((data:{}) => {
      this.MyBooks = data;
    })
  }
}