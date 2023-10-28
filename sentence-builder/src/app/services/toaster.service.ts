import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  public showSuccess = (msg:any) => {
    this.toastr.success(msg, 'Success');
  }

  public showError = (msg:any) => {
    this.toastr.error(msg, 'Error');
  }

  public showWarning = (msg:any) => {
    this.toastr.warning(msg, 'Warning');
  }

  public showResponse = (msg:any, response:any) => {
    this.toastr.info(msg, response);
  }
}
