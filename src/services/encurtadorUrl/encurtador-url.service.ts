import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncurtadorUrlService {
  API_URL = 'http://92.113.34.132:3000/short';
  API_KEY = '0b017beee143cc543199';

  constructor(private http: HttpClient) { }

  encurtarUrl(urlOriginal: string) {
    const payload = {
      key: this.API_KEY,
      url: urlOriginal
    };

    return firstValueFrom(this.http.post<any>(this.API_URL, payload));
  }
}
