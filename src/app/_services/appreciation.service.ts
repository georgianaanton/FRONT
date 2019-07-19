import { Injectable } from '@angular/core';
import {Appreciation } from '../_models/appreciation';

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class AppreciationService {

  constructor() { }

currentlyPlaying : string;
  
 //  updateAppreciation(song: string, appreciation : Appreciation) {
 //  this.currentlyPlaying = song;
	// localStorage.setItem(song, JSON.stringify(appreciation));
 //  }

  getAppreciation(song: string) {
  	return JSON.parse(localStorage.getItem(song));
  }


  addLike(song: string) {
  	let appreciation = this.getAppreciation(song);
  	if (appreciation == null || appreciation == undefined){
  		appreciation= new Appreciation(0,0);
  	}
	appreciation.likes++;
	localStorage.setItem(song, JSON.stringify(appreciation));
}

addDislike(song: string) {
	let appreciation = this.getAppreciation(song);
		if (appreciation == null || appreciation == undefined){
  		appreciation= new Appreciation(0,0);
  	}
	appreciation.dislikes++;
	localStorage.setItem(song, JSON.stringify(appreciation));
}

 setCurrentlyPlaying(song: string) {
 console.log("set currently playing in appreciation service  " + song);
this.currentlyPlaying = song;

 }

getCurrentlyPlaying() {
	 console.log("get currently playing in appreciation service  " + this.currentlyPlaying);
	return this.currentlyPlaying;
}
}
