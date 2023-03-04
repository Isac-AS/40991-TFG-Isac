import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs";
import { API_URL } from "../env";
import { User } from "../models/user.model";

@Injectable()
export class UserApiService {
    constructor(private http: HttpClient) {}

    // GET list of public
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${API_URL}/users`).pipe(
            catchError(error => {
                return throwError(() => new Error(error.message))
            }))
    }

    addUser(user: User): Observable<any> {
        return this.http.post(`${API_URL}/users`, user);
    }
}
