import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddTaskComponent } from './components/add-task/add-task.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'addTask', component: AddTaskComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
