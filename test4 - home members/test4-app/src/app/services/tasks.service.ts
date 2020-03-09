import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    constructor(private httpClient: HttpClient) { }

    getTodoList(): Observable<TaskModel[]> {
        return this.httpClient.get<TaskModel[]>(`${environment.serverUri}/tasks`);
    }

    createTask(taskToAdd): Observable<TaskModel[]> {
        return this.httpClient.post<TaskModel[]>(`${environment.serverUri}/tasks`, taskToAdd);
    }
}
