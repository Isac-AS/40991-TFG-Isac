import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs";
import { API_URL } from "../env";
import { User, UserRelatedResponse } from "../models/user.model";

@Injectable()
export class UserApiService {
    constructor(private http: HttpClient) {}

    // GET list of users
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${API_URL}/accounts/get_users`).pipe(
            catchError(error => {
                return throwError(() => new Error(error.message))
            }))
    }

    // POST to get answer on whether the password is correct
    login(email: string, password: string): Observable<UserRelatedResponse>{
        return this.http.post<UserRelatedResponse>(`${API_URL}/login`, {'email': email, 'password': password}, { withCredentials: true })
    }

    // POST action to register a potentially new user
    register(user: User): Observable<UserRelatedResponse> {
        return this.http.post<UserRelatedResponse>(`${API_URL}/register`, user, { withCredentials: true });
    }
    
    // GET to logout
    logOut(): Observable<UserRelatedResponse> {
        return this.http.get<UserRelatedResponse>(`${API_URL}/logout`, { withCredentials: true });
    }
    
    // Check if there is a current user
    idAuthenticated(): Observable<UserRelatedResponse> {
        return this.http.get<UserRelatedResponse>(`${API_URL}/accounts/getsession`, { withCredentials: true });
    }

    // User data
    getCurrentUserData(): Observable<UserRelatedResponse> {
        return this.http.get<UserRelatedResponse>(`${API_URL}/accounts/current_user_data`, { withCredentials: true });
    }

}
