import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Poem } from 'src/app/Poem';

@Injectable({
  providedIn: 'root'
})
export class PoemService {
  poetryEndPoint:string;
  springEndPoint:string;
  searchByTitleEndPoint:string;
  searchByAuthorEndPoint:string;
  sonnetsEndPoint:string;

  constructor(private http: HttpClient) {
    this.poetryEndPoint="http://poetrydb.org/author";
    this.springEndPoint="http://localhost:5655/api/v1/favouritelistservice/poem";
	this.sonnetsEndPoint="http://poetrydb.org/author,title/Shakespeare;Sonnet";
	this.searchByTitleEndPoint="http://poetrydb.org/title/";
   }

   getAllAuthors(){
  return   this.http.get<Array<any>>(`${this.poetryEndPoint}`);
   }

   getSonnets(){
    return this.http.get<Array<any>>(`${this.sonnetsEndPoint}`);
     }

    getPoemsByTitle(keyword){
      console.log("in service",keyword);
	   return this.http.get<Array<any>>(`${this.searchByTitleEndPoint}${keyword}`);
    }

    getTitles(authorName){
	   return this.http.get<Array<any>>(`${this.poetryEndPoint}/${authorName}/title`);
    }

    addToFavourites(addPoem){
      console.log(addPoem);
      return this.http.post(`${this.springEndPoint}`,addPoem);
    }
	
	
    getMyFavouritePoems(){
      return this.http.get<Array<any>>(`${this.springEndPoint}`);
    }

    deleteMyPoem(poem){
		const deUrl=`${this.springEndPoint}/${poem.id}`;
      return this.http.delete(deUrl);
    }
	
	
    updatePoem(poem){
		const deUrl=`${this.springEndPoint}/${poem.id}`;
      return this.http.put<Poem>(deUrl,poem);
    }
	
	
}
