import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private timeout: number = 3000;

  constructor(private toastr: ToastrService) {
  }

  showSuccessMessage(message: string, title?: string) {
    this.toastr.success(message, title, {
      timeOut: this.timeout,
    });
  }

  showWarningMessage(message: string, title?: string) {
    this.toastr.warning(message, title, {
      timeOut: this.timeout,
    });
  }

  showErrorMessage(message: string, title?: string) {
    this.toastr.error(message, title, {
      timeOut: this.timeout,
    });
  }

  showInfoMessage(message: string, title?: string) {
    this.toastr.info(message, title, {
      timeOut: this.timeout,
    });
  }
}
