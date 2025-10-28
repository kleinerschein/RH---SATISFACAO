import { CanActivateFn } from '@angular/router';
import { CookiesService } from '../helpers/cookies/cookies.service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = new CookiesService();
  const isLoggedIn = cookie.getCookie('logado') === 'true';

  if (!isLoggedIn) {
    window.location.href = '/login';
    return false;
  }

  return true;
};
