import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task } from "../Model/Task";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  url: string = "https://angularhttpclientssss-ki-default-rtdb.firebaseio.com";

  errorSubject = new Subject<HttpErrorResponse>();

  CreateTask(data: Task) {
    console.log(data);
    this.http
      .post<{ name: string }>(this.url + "/tasks.json", data, {
        headers: { "my-header": "hello-world" },
      })
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
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
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  DeleteAllTasks() {
    console.log("delete all");
    this.http
      .delete(
        "https://angularhttpclient-ki-default-rtdb.firebaseio.com/tasks.json"
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
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

  UpdateTask(id: string, data: Task) {
    this.http.put(this.url + "/tasks/" + id + ".json", data).subscribe({
      error: (err) => {
        this.errorSubject.next(err);
      },
    });
  }
}
