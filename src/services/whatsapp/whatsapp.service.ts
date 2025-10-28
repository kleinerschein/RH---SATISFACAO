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
    try {
      const mensagem = `Convidamos você a participar da pesquisa de clima da Kleiner 2025.
Queremos ouvir você!
Nos ajude a construir um ambiente de trabalho mais saudável e positivo!
Acesse o link abaixo para responder a pesquisa de forma rápida e anônima:
${message}
Sua opinião é muito importante para nós!
Agradecemos sua participação!`;

      const payload = {
        text: mensagem,
        phone: to,
      };

      const res = await firstValueFrom(this.http.post(this.BASE_URL, payload));
      return res;
    } catch (err) {
      console.error('Erro ao enviar mensagem via WhatsApp:', err);
      return null;
    }
  }
}
