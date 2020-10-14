import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommanServices extends BaseService {

  constructor(
    private _http: HttpClient
  ) {
    super(_http);
  }

  getDetailsById(url, id) {
    return this.get(url, id);
  }

  getDetails(url, option?: any, body?: any, count?: any) {
    return this.get(url, option, body, count);
  }

  addDetails(url, params) {
    return this.post(url, params);
  }

  updateDetails(url, params, id) {
    return this.patch(url, params, id);
  }

  updateDetailsAll(url, params) {
    return this.patch(url, params);
  }

  deleteDetails(url, id) {
    return this.delete(url, id);
  }

  getLocalStorage(name) {
    let res = localStorage.getItem(name)
    if (res) {
      return res
    }
    else {
      return ""
    }
  }

}
