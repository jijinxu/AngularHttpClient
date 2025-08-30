import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Task } from "../Model/Task";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { TaskService } from "../Services/task.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  showCreateTaskForm: boolean = false;

  http: HttpClient = inject(HttpClient);

  allTasks: Task[] = [];

  selectedTask: Task;

  taskService: TaskService = inject(TaskService);

  editMode: boolean = false;
  currentTaskid: string;

  isLoading: boolean = false;

  errorMessage: string = null;

  errSub: Subscription;

  showTaskDetails: boolean = false;

  currentGetTask: any;
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
    this.errSub = this.taskService.errorSubject.subscribe((httpError) => {
      this.setErrorMessage(httpError);
    });
    this.fetchAllTask();
  }

  ngOnDestroy() {
    this.errSub.unsubscribe();
  }

  fetchAllTask() {
    this.isLoading = true;
    // this.taskService.getAllTask().subscribe(
    //   (tasks) => {
    //     this.allTasks = tasks;
    //     this.isLoading = false;
    //   },
    //   (error) => {
    //     console.log("aaa", error.error);
    //   }
    // );
    this.taskService.getAllTask().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.setErrorMessage(error);
        this.isLoading = false;
      },
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

  private setErrorMessage(err: HttpErrorResponse) {
    if (err.error.error === "Permission denied") {
      this.errorMessage = "you have no permission to perform this action.";
    } else {
      this.errorMessage = err.message;
    }

    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  showCurrentTaskDetails(id: string) {
    this.showTaskDetails = true;
    this.taskService.getTaskDetail(id).subscribe({
      next: (data) => {
        this.currentGetTask = data;
        console.log("aaa");
        console.log(data);
      },
    });
  }

  OnCloseDetailView(event) {
    console.log(event);
    this.showTaskDetails = event;
  }
}
