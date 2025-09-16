import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html',
  styleUrl: './modal-loading.component.css'
})
export class ModalLoadingComponent {
  @Input() loadingVisible: boolean = false;


  startLoading() {
    this.loadingVisible = true;
  }

  stopLoading() {
    this.loadingVisible = false;
  }
}
