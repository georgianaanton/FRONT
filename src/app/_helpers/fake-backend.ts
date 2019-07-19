import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        let mentors: any[] = [
            {
            id: 123,
            password: '',
            username: 'peter@yahoo.com',
            firstName: 'Peter',
            lastName: 'Dinklage',
            skills: [{id: '1', description: 'Java'}, {id: '2', description: 'Spring'}, {id: '9', description: 'Hibernate'}],
            trainings : [{id: '1', description: 'Java Training'}, {id: '1', description: 'Spring Training'}],
            token: '',
            yearsOfExperience : 4,
            noTrainings : 2,
            fee : 30,
            role: 'MENTOR'
        
            },
        
            {
              id: 124,
              password: '',
              username: 'johanna@gmail.com',
              firstName: 'Johanna',
              lastName: 'Monton',
              skills: [{id: '3', description: 'SQL'}, {id: '4', description: 'Oracle'}],
              trainings : [{id: '3', description: 'SQL Training'}, {id: '4', description: 'Oracle Training'}],
              token: '',
              yearsOfExperience : 6,
              noTrainings : 7,
              fee : 45,
              role: 'MENTOR'
            },
            {
              id: 125,
              password: '',
              username: 'arun@gmail.com',
              firstName: 'Arun',
              lastName: 'Kumar',
              skills: [{id: '5', description: 'Angular'}, {id: '6', description: 'Docker'}],
              trainings : [{id: '5', description: 'Angular Training'}, {id: '6', description: 'Docker Training'}],
              token: '',
              yearsOfExperience : 3,
              noTrainings : 2,
              fee : 32,
              role: 'MENTOR'
            },
            {
                id: 126,
                password: '',
                username: 'tony@yahoo.com',
                firstName: 'Anthony',
                lastName: 'Marony',
                skills: [{id: '7', description: 'MongoDB'}, {id: '8', description: 'Cloud'}],
                trainings : [{id: '7', description: 'MongoDB basics'}, {id: '8', description: 'Learn Cloud Step by Step'}],
                token: '',
                yearsOfExperience : 2,
                noTrainings : 2,
                fee : 25,
                role: 'MENTOR'
              },
              {
                id: 127,
                password: '',
                username: 'frank@yahoo.com',
                firstName: 'Franck',
                lastName: 'Groener',
                skills: [{id: '7', description: 'C++'}, {id: '8', description: 'Java'}],
                trainings : [{id: '7', description: 'C++ for Beginners'}, {id: '8', description: 'Java for Beginners'}],
                token: '',
                yearsOfExperience : 4,
                noTrainings : 5,
                fee : 35,
                role: 'MENTOR'
              }
           
          ]

          let trainingsInProgress: any[] = [
              { id: '2', description: 'Java 8 Training',
            mentorName: 'Arun Kumar',
            mentorId : 125,
            status : 'confirmed',
            rating : 5},
            { id: '3', description: 'Angular From Zero To Hero',
            mentorName: 'Arun Kumar',
            mentorId : 125,
            status : 'proposed',
            rating : 5} ,
            { id: '4', description: 'Learn Docker By Example',
            mentorName: 'Johanna Monton',
            mentorId : 124,
            status : 'started',
            rating : 5} 
        ];

        let trainings: any[] = [
            { id: '2', description: 'Java 8 Training',
          mentorName: 'Arun Kumar',
          mentorId : 125,
          rating : 4.5
         },
          { id: '3', description: 'Angular From Zero To Hero',
          mentorName: 'Arun Kumar',
          mentorId : 125,
          rating : 5
         } ,
          { id: '4', description: 'Learn Docker By Example',
          mentorName: 'Johanna Monton',
          mentorId : 124,
          rating : 4
         },
         { id: '5', description: 'Spring Explained',
         mentorName: 'Anthony Marony',
         mentorId : 126,
         rating : 4
        },
        { id: '6', description: 'Full Stak Developer Course',
        mentorName: 'Peter Dinklage',
        mentorId : 123,
        rating : 5
       },
       { id: '7', description: 'JPA Complete Course',
       mentorName: 'Peter Dinklage',
       mentorId : 123,
       rating : 4.7
      }
       

      ];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get mentors
            if (request.url.endsWith('/getAllMentors') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
               
                    return of(new HttpResponse({ status: 200, body: mentors }));
               
            }

            // get all trainings
            if (request.url.endsWith('/getAllTrainings') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
               
                    return of(new HttpResponse({ status: 200, body: trainings }));
               
            }

             // get trainings in progress
             if (request.url.match(/\/trainingsInProgress\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
               
                    return of(new HttpResponse({ status: 200, body: trainingsInProgress }));
               
            }

            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get mentor by id
            if (request.url.match(/\/mentors\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
              
                    // find mentor by id in mentors array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedMentors = mentors.filter(mentor => { return mentor.id === id; });
                    let mentor = matchedMentors.length ? matchedMentors[0] : null;

                    return of(new HttpResponse({ status: 200, body: mentor }));
              
            }

            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            if (request.url.match(/\/sendProposal\/\d+$/) && request.method === 'POST') {
                return of(new HttpResponse({ status: 200 }));
            }
            if (request.url.match(/\/startTraining\/\d+$/) && request.method === 'POST') {
                return of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }

    
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};