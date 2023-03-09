import { API_URL } from "../env";
import { catchError } from "rxjs";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from '@angular/common/http'
import { GlobalService } from "./global.service";
import { User, UserRelatedResponse } from "../models/user.model";

@Injectable()
export class UserApiService {
    constructor(
        private http: HttpClient,
        public globalService: GlobalService,
        ) {}

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

    // Fetch CURRENT User data
    getCurrentUserData(): Observable<UserRelatedResponse> {
        return this.http.get<UserRelatedResponse>(`${API_URL}/accounts/current_user_data`, { withCredentials: true });
    }

    // Dete user
    deleteUser(user_id: number): Observable<UserRelatedResponse> {
        return this.http.post<UserRelatedResponse>(`${API_URL}/accounts/delete`, {'id': user_id}, {withCredentials: true})
    }

    // Modify user
    modifyUser(user: User): Observable<UserRelatedResponse>{
        return this.http.post<UserRelatedResponse>(`${API_URL}/accounts/modify`, {'user': user}, {withCredentials: true})
    }

    /**
     * Function that will query the current session in the database and will updates the values 
     * of the "global service" "loggedInfo" object.
     */
    updateCurrentUserData() {
        this.getCurrentUserData().subscribe({
            next: res => {
                if (res.result == true) {
                    this.globalService.loggedInfo.next({
                        isLoggedIn: true,
                        username: res.user.username,
                        role: res.user.role,
                        is_admin: res.user.is_admin,
                    })
                } else {
                    this.globalService.loggedInfo.next({
                        isLoggedIn: false,
                        username: '',
                        role: '0',
                        is_admin: false,
                    })
                }
            }
        })
    }

}
