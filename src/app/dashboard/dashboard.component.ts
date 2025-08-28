import { Component, OnInit, inject } from "@angular/core";
import { Task } from "../Model/Task";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { TaskService } from "../Services/task.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  showCreateTaskForm: boolean = false;

  http: HttpClient = inject(HttpClient);

  allTasks: Task[] = [];

  selectedTask: Task;

  taskService: TaskService = inject(TaskService);

  editMode: boolean = false;
  currentTaskid: string;

  isLoading: boolean = false;

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
    this.editMode = false;
    this.selectedTask = {
      title: "",
      desc: "",
      assignedTo: "",
      createdAt: "",
      priority: "",
      status: "",
      id: "",
    };
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  CreateOrUpdateTask(data: Task) {
    if (!this.editMode) {
      this.taskService.CreateTask(data);
    } else {
      this.taskService.UpdateTask(this.currentTaskid, data);
    }
  }

  FetchAllTaskClicked() {
    this.fetchAllTask();
  }

  ngOnInit(): void {
    this.fetchAllTask();
  }

  fetchAllTask() {
    this.isLoading = true;
    this.taskService.getAllTask().subscribe((tasks) => {
      this.allTasks = tasks;
      this.isLoading = false;
    });
  }
  //delete a single task
  DeleteTask(id: string) {
    this.taskService.DeleteTask(id);
  }

  DeleteAllTasks() {
    this.taskService.DeleteAllTasks();
  }

  UpdateTask(id: string) {
    this.showCreateTaskForm = true;
    this.editMode = true;
    this.currentTaskid = id;
    console.log(id);
    console.log(this.allTasks);
    this.selectedTask = this.allTasks.find((curtask) => {
      return curtask.id === id;
    });
    console.log(this.selectedTask);
  }
}
