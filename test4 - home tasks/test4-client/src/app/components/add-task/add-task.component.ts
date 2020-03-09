import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskModel } from 'src/app/models/task';
import { Router } from '@angular/router';
import { TenantsService } from 'src/app/services/tenants.service';
import { TenantModel } from 'src/app/models/tenant-model';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
    constructor(private tasksService: TasksService, private tenantsService: TenantsService, private router: Router) { }
    public note: string = 'Please fill all the fields';
    public tenants: TenantModel[];
    private selectedTenant: string;
    public today:string = this.getTodayDateStr();

    ngOnInit(): void {
        this.tenantsService.getTenants().subscribe(res => {
            this.tenants = res;
        });
    }

    addTask(description, date) {
        const taskToAdd: TaskModel = {
            description: description.value,
            date: date.value,
            tenantName: this.selectedTenant,
        }
        if (description.value === '' || date.value === '' || taskToAdd.tenantName === '' ||  taskToAdd.tenantName === undefined ) {
            alert('all fields must be filled!');
        } else {
            this.tasksService.createTask(taskToAdd).subscribe(res => {
                this.router.navigate(['/']);
            });
        }
    }

    selectChangeHandler(event: any) {
        this.selectedTenant = event.target.value;
    }

    getTodayDateStr():string {
        const date = new Date();
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    }
}
