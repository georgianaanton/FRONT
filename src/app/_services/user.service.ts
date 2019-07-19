import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from '../_models/user';
// import {Observable} from 'rxjs';
import {Training} from "../_models/training";
import {Observable} from "rxjs/index";
import {AppSettings} from "../app-settings";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backendApi = "localhost/3000";

  apiPrefix = `${AppSettings.API_PREFIX}/users`;
  personsApiPrefix = `${AppSettings.PERSONS_API_PREFIX}/users`;
  
  register(user: User) {
    //return this.http.post(`${config.apiUrl}/users/register`, user);
    return this.http.post( this.apiPrefix, user);
  }

  getAll() {
    return this.http.get(this.personsApiPrefix + `/users`);
}

  getAllMentors() {
    //return this.http.post(`${config.apiUrl}/users/register`, user);
    return this.http.get( this.personsApiPrefix + `/getAllMentors`);
  }

  getAllTrainings() {
    //return this.http.post(`${config.apiUrl}/users/register`, user);
    return this.http.get(this.personsApiPrefix + `/getAllTrainings`);
  }

  getTrainingsInProgress(username: string) {
    //return this.http.post(`${config.apiUrl}/users/register`, user);
    return this.http.get( this.personsApiPrefix + `/trainingsInProgress/` + username);
  }

  getMentorById(id: number) {
    return this.http.get(this.backendApi +  `/mentors/` + id);
}

 sendProposal (user : User, mentorId : number) {
   return this.http.post(this.backendApi + `/sendProposal/` + mentorId, user);
 }

 startTraining (user : User, trainingId : string) {
  return this.http.post(this.backendApi + `/startTraining/` + trainingId, user);
}

  public user = {isAuthenticated: false}
  constructor(private http: HttpClient) { }

  showUser(){
    console.log(this.user)
  }

  
}