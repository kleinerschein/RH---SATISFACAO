import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  BASE_URL = 'https://api.kleiner.ind.br/api/kleiner/Message.php';

  constructor(private http: HttpClient) {}

  async sendMessage(message: string, to: string) {
    const payload = {
      text: message,
      phone: to,
    };

    const res = await firstValueFrom(this.http.post(this.BASE_URL, payload));
    return res;
  }
}
