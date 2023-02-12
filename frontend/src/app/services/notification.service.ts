import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  showSuccessMessage(message: string, title?: string) {
    this.toastr.success(message, title, {
      timeOut: 4000,
    });
  }

  showWarningMessage(message: string, title?: string) {
    this.toastr.warning(message, title, {
      timeOut: 4000,
    });
  }

  showErrorMessage(message: string, title?: string) {
    this.toastr.error(message, title, {
      timeOut: 4000,
    });
  }

  showInfoMessage(message: string, title?: string) {
    this.toastr.info(message, title, {
      timeOut: 4000,
    });
  }
}
