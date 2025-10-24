import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  BASE_URL = 'http://localhost:3001/whatsapp/send';

  constructor(private http: HttpClient) {}

  async sendMessage(message: string, to: string) {
    const payload = {
      message,
      to,
    };

    const res = await firstValueFrom(this.http.post(this.BASE_URL, payload));
    console.log(res);
    return res;
  }
}
