import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private http: HttpClient
  ) { }

  get(action: string, options?: any, body?: any, count?: any) {
    return this._get(environment.API_URL, action, options, body, count);
  }

  post(action: string, data: any, options?: any, header?: any) {
    return this._post(environment.API_URL, action, data, options, header);
  }

  patch(action: string, data: any, options?: any, header?: any) {
    return this._patch(environment.API_URL, action, data, options, header);
  }

  delete(action: string, options?: any) {
    return this._delete(environment.API_URL, action, options);
  }

  _get(url: string, action: string, options: any, body: any, count) {

    console.log(options);

    url = `${url}${action}`;
    if (options) {
      let id = "/" + options
      url += `${id}`
    }

    if (body) {
      let id = "?filter=" + body
      url += `${id}`
    }

    if (count) {
      let id = "?where=" + count
      url += `${id}`
    }

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res) => {
          resolve(res);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  _post(url: string, action: string, data: any, options?: any, header?: any) {
    if (options) {
      action = action + "/" + options;
    }
    url = `${url}${action}`;
    // const httpHeaders = new HttpHeaders();
    // httpHeaders.set('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.post(url, data, header).subscribe(
        (res) => {
          resolve(res);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }
  _patch(url: string, action: string, data: any, options?: any, header?: any) {
    console.log(options);

    if (options) {
      action = action + "/" + options;
    }
    url = `${url}${action}`;
    return new Promise((resolve, reject) => {
      this.http.put(url, data, header).subscribe(
        (res) => {
          resolve(res);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  _delete(url: string, action: string, options: any) {
    if (options) {
      action = action + "/" + options;
    }
    url = `${url}${action}`;
    return new Promise((resolve, reject) => {
      this.http.delete(url).subscribe(
        (res) => {
          resolve(res);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }
}
