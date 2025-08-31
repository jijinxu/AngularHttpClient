import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEventType,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

// @Injectable({
//   providedIn: "root",
// })
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Auth interceptor OK");
    let modifiedReq = req.clone({ headers: req.headers.append("auth", "abc") });
    return next.handle(modifiedReq).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log("response has arrived.data :");
          console.log(event.body);
        }
      })
    );
    //return null;
  }
}
