import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskModel } from 'src/app/models/task';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public toDoList: TaskModel[];
    constructor(private tasksService: TasksService) { }

    ngOnInit(): void {
        this.tasksService.getTodoList().subscribe(res => {
            this.toDoList = res;
        });
    }

}
