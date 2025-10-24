import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-boas-vindas',
  templateUrl: './modal-boas-vindas.component.html',
  styleUrl: './modal-boas-vindas.component.css'
})
export class ModalBoasVindasComponent {
  visible: boolean = true;

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
  
}
