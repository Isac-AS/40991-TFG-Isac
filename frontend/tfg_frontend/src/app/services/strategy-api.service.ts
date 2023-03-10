import { API_URL } from "../env";
import { catchError } from "rxjs";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from '@angular/common/http'
import { GlobalService } from "./global.service";
import { Strategy, StrategyRelatedResponse } from "../models/strategy.model";

@Injectable()
export class StrategyAPIService {
    constructor(
        private http: HttpClient,
        public globalService: GlobalService,
    ) { }

    getAllStrategies(): Observable<Strategy[]> {
        return this.http.get<Strategy[]>(`${API_URL}/strategies/get_all`).pipe(
            catchError(error => {
                return throwError(() => new Error(error.message))
            }))
    }

    getStrategy(id: number): Observable<StrategyRelatedResponse> {
        return this.http.post<StrategyRelatedResponse>(`${API_URL}/strategies/read`, { 'id': id }, { withCredentials: true })
    }

    createStrategy(strategy: Strategy): Observable<StrategyRelatedResponse> {
        return this.http.post<StrategyRelatedResponse>(`${API_URL}/strategies/create`, { 'strategy': strategy }, { withCredentials: true })
    }

    updateStrategy(strategy: Strategy): Observable<StrategyRelatedResponse> {
        return this.http.post<StrategyRelatedResponse>(`${API_URL}/strategies/update`, { 'strategy': strategy }, { withCredentials: true })
    }

    deleteStrategy(id: number): Observable<StrategyRelatedResponse> {
        return this.http.post<StrategyRelatedResponse>(`${API_URL}/strategies/delete`, { 'id': id }, { withCredentials: true })
    }
}
