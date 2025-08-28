import { Component, OnInit, inject } from "@angular/core";
import { Task } from "../Model/Task";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  showCreateTaskForm: boolean = false;

  http: HttpClient = inject(HttpClient);

  url: string = "https://angularhttpclient-ki-default-rtdb.firebaseio.com";

  allTasks: Task[] = [];

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  CreateTask(data: Task) {
    console.log(data);
    this.http
      .post<{ name: string }>(this.url + "/tasks.json", data, {
        headers: { "my-header": "hello-world" },
      })
      .subscribe((response) => {
        // console.log(response);
        // this.fetchAllTask();
      });
  }

  FetchAllTaskClicked() {
    this.fetchAllTask();
  }

  ngOnInit(): void {
    this.fetchAllTask();
  }
  private fetchAllTask() {
    this.http
      .get<{ [key: string]: Task }>(this.url + "/tasks.json", {
        headers: { myhhh: "aaa" },
      })
      .pipe(
        map((response) => {
          let tasks = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              tasks.push({ ...response[key], id: key });
            }
          }
          return tasks;
        })
      )
      .subscribe((tasks) => {
        this.allTasks = tasks;
      });
  }

  //delete a single task
  DeleteTask(id: string) {
    console.log("delete " + id);
    this.http
      .delete(
        "https://angularhttpclient-ki-default-rtdb.firebaseio.com/tasks/" +
          id +
          ".json"
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
