import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task } from "../Model/Task";
import { catchError, map } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { LoggingService } from "./logging.service";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  url: string = "https://angularhttpclient-ki-default-rtdb.firebaseio.com";

  errorSubject = new Subject<HttpErrorResponse>();

  loggingService: LoggingService = inject(LoggingService);

  headers: HttpHeaders = new HttpHeaders({
    myheader: "helloworld",
    myheader2: "helloworld2",
  });

  CreateTask(data: Task) {
    console.log(data);
    this.http
      .post<{ name: string }>(this.url + "/tasks.json", data, {
        headers: this.headers,
      })
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            datetime: new Date(),
          };
          this.loggingService.logError(errorObj);
          return throwError(() => err);
        })
      )
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
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            datetime: new Date(),
          };
          this.loggingService.logError(errorObj);
          return throwError(() => err);
        })
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
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            datetime: new Date(),
          };
          this.loggingService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  getAllTask() {
    let myheaders = new HttpHeaders();
    myheaders = myheaders.set("myhhh1", "helloworld1");
    myheaders = myheaders.append("myhhh1", "helloworld2");
    myheaders = myheaders.set("Access-Control-Allow-Origin", "*");

    let queryParam: HttpParams = new HttpParams();
    queryParam = queryParam.set("page", 2);
    queryParam = queryParam.set("item", 10);

    return this.http
      .get<{ [key: string]: Task }>(
        "https://angularhttpclient-ki-default-rtdb.firebaseio.com/tasks.json",
        {
          headers: myheaders,
          params: queryParam,
          observe: "body",
        }
      )
      .pipe(
        map((response) => {
          let tasks = [];
          console.log(response);
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              tasks.push({ ...response[key], id: key });
            }
          }
          return tasks;
        }),
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            datetime: new Date(),
          };
          this.loggingService.logError(errorObj);
          return throwError(() => err);
        })
      );
  }

  getTaskDetail(id: string) {
    return this.http
      .get<Task>(
        "https://angularhttpclient-ki-default-rtdb.firebaseio.com/tasks/" +
          id +
          ".json"
      )
      .pipe(
        map((response) => {
          let task = { ...response, id: id };
          return task;
        })
      );
  }

  UpdateTask(id: string, data: Task) {
    this.http
      .put(this.url + "/tasks/" + id + ".json", data)
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            datetime: new Date(),
          };
          this.loggingService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }
}
