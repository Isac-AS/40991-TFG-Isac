import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public pageName = new BehaviorSubject<any>({
        currentPageName: 'Página principal'
    });
}