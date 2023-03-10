import { API_URL } from "../env";
import { catchError } from "rxjs";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from '@angular/common/http'
import { GlobalService } from "./global.service";
import { HealthRecord, HealthRecordRelatedResponse } from "../models/health-record.model";

@Injectable()
export class HeathRecordAPIService {
    constructor(
        private http: HttpClient,
        public globalService: GlobalService,
    ) { }

    getAllRecords(): Observable<HealthRecord[]> {
        return this.http.get<HealthRecord[]>(`${API_URL}/health_records/get_all`).pipe(
            catchError(error => {
                return throwError(() => new Error(error.message))
            }))
    }

    getHealthRecord(id: number): Observable<HealthRecordRelatedResponse> {
        return this.http.post<HealthRecordRelatedResponse>(`${API_URL}/health_records/read`, { 'id': id }, { withCredentials: true })
    }

    createRecord(healthRecord: HealthRecord): Observable<HealthRecordRelatedResponse> {
        return this.http.post<HealthRecordRelatedResponse>(`${API_URL}/health_records/create`, { 'healthRecord': healthRecord }, { withCredentials: true })
    }

    updateHealthRecord(healthRecord: HealthRecord): Observable<HealthRecordRelatedResponse> {
        return this.http.post<HealthRecordRelatedResponse>(`${API_URL}/health_records/update`, { 'healthRecord': healthRecord }, { withCredentials: true })
    }

    deleteHealthRecord(id: number): Observable<HealthRecordRelatedResponse> {
        return this.http.post<HealthRecordRelatedResponse>(`${API_URL}/health_records/delete`, { 'id': id }, { withCredentials: true })
    }
}
