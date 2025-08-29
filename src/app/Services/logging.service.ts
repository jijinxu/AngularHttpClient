import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoggingService {
  http: HttpClient = inject(HttpClient);
  logError(data: { statusCode: number; errorMessage: string; datetime: Date }) {
    this.http
      .post(
        "https://angularhttpclient-ki-default-rtdb.firebaseio.com/log.json",
        data
      )
      .subscribe();
  }

  fetchError() {
    this.http
      .get("https://angularhttpclient-ki-default-rtdb.firebaseio.com/log.json")
      .subscribe((errors) => {
        console.log(errors);
      });
  }
}
