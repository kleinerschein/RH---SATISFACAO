import { Injectable } from '@angular/core';
import { Base64Helper } from '../../helpers/base64';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor() {}

  setCookie(name: string, value: string, hours: number) {
    const date = new Date();
    const name64 = Base64Helper.encode(name);
    const value64 = Base64Helper.encode(value);

    date.setTime(date.getTime() + hours * 60 * 60 * 1000);

    const secureFlag = window.location.protocol === 'https:' ? 'Secure;' : ''; // Só adiciona Secure em HTTPS

    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; ${secureFlag} SameSite=Strict`;
  }

  getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    const name64 = Base64Helper.encode(name);

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }

    return null;
  }

  deleteCookie(name: string) {
    const name64 = Base64Helper.encode(name);
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
