import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task } from "../Model/Task";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  url: string = "https://angularhttpclient-ki-default-rtdb.firebaseio.com";

  CreateTask(data: Task) {
    console.log(data);
    this.http
      .post<{ name: string }>(this.url + "/tasks.json", data, {
        headers: { "my-header": "hello-world" },
      })
      .subscribe((response) => {
        console.log(response);
        // this.fetchAllTask();
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
      .subscribe((response) => {});
  }

  DeleteAllTasks() {
    console.log("delete all");
    this.http
      .delete(
        "https://angularhttpclient-ki-default-rtdb.firebaseio.com/tasks.json"
      )
      .subscribe(() => {});
  }

  getAllTask() {
    return this.http
      .get<{ [key: string]: Task }>(
        "https://angularhttpclient-ki-default-rtdb.firebaseio.com/tasks.json",
        {
          headers: { myhhh: "aaa" },
        }
      )
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
      );
  }
}
