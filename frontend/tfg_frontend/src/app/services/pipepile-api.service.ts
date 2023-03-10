import { API_URL } from "../env";
import { catchError } from "rxjs";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from '@angular/common/http'
import { GlobalService } from "./global.service";
import { Pipeline, PipelineRelatedResponse } from "../models/pipeline.model";

@Injectable()
export class PipelineAPIService {
    constructor(
        private http: HttpClient,
        public globalService: GlobalService,
    ) { }

    getAllPipelines(): Observable<Pipeline[]> {
        return this.http.get<Pipeline[]>(`${API_URL}/pipelines/get_all`).pipe(
            catchError(error => {
                return throwError(() => new Error(error.message))
            }))
    }

    getPipeline(id: number): Observable<PipelineRelatedResponse> {
        return this.http.post<PipelineRelatedResponse>(`${API_URL}/pipelines/read`, { 'id': id }, { withCredentials: true })
    }

    createPipeline(pipeline: Pipeline): Observable<PipelineRelatedResponse> {
        return this.http.post<PipelineRelatedResponse>(`${API_URL}/pipelines/create`, { 'pipeline': pipeline }, { withCredentials: true })
    }

    updatePipeline(pipeline: Pipeline): Observable<PipelineRelatedResponse> {
        return this.http.post<PipelineRelatedResponse>(`${API_URL}/pipelines/update`, { 'pipeline': pipeline }, { withCredentials: true })
    }

    deletePipeline(id: number): Observable<PipelineRelatedResponse> {
        return this.http.post<PipelineRelatedResponse>(`${API_URL}/pipelines/delete`, { 'id': id }, { withCredentials: true })
    }
}
