import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastService } from '../toast.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = environment.apiURL;

  constructor(private toastService: ToastService, private http: HttpClient, private nativeHTTP: HTTP) { }

  get(url: any, headers = {}) {

    this.nativeHTTP.setDataSerializer("urlencoded");
    return this.http.get(this.baseURL + url, { headers: headers });

  }

  // post(url:any, data:any, headers = {}) {
  //   this.nativeHTTP.setDataSerializer("urlencoded");
  //   return this.http.post(this.baseURL + url, data, headers);
  // }

  post(url: any, data: any, headers = {}) {
    this.nativeHTTP.setDataSerializer("urlencoded");
    return this.http.post(this.baseURL + url, data, headers);
    // return this.nativeHTTP.post(this.baseURL + url, data, headers);
  }

  put(url: any, data: any, headers = {}) {
    this.nativeHTTP.setDataSerializer("urlencoded");
    return this.http.put(this.baseURL + url, data, headers);
  }





}


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url;
    let headers = req.headers; //new HttpHeaders();
    headers = headers.set('Accept', 'application/json');

    const request = req.clone({
      // url: environment.apiURL + url,
      url,
      headers,
      withCredentials: true
    });

    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      console.warn('HttpErrorResponse', Object.entries(err));
      return throwError(err);
    }), finalize(() => {
      //console.warn('Finalize Http Request');
    }));

  }

}

