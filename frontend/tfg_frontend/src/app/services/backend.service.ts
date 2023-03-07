import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs";
import { API_URL } from "../env";
import { User } from "../models/user.model";

@Injectable()
export class UserApiService {
    constructor(private http: HttpClient) {}

    // GET: Ping the backend
    ping(): any {
        return this.http.get<any>(`${API_URL}/api/ping`).pipe(
            catchError(error => {
                return throwError(() => new Error(error.message))
            }))
    }
}
