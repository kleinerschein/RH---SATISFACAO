import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  SENIOR_DEFAULT_PASSWORD,
  SENIOR_DEFAULT_USER,
  SeniorOptions,
} from './options';

export default class SeniorHandler<T extends keyof SeniorOptions> {
  constructor(
    private readonly http: HttpClient,
    private readonly service: T,
    private readonly credentials: {
      user: string;
      password: string;
      encryption?: number;
    } = {
      user: SENIOR_DEFAULT_USER,
      password: SENIOR_DEFAULT_PASSWORD,
    }
  ) {
    this.credentials.encryption = this.credentials.encryption || 0;
  }

  private arrayToXml(
    array: Record<string, any>,
    rootElementName = 'root'
  ): string {
    const xml = document.implementation.createDocument(
      '',
      rootElementName,
      null
    );
    this.arrayToXmlRecursive(array, xml.documentElement);
    const serializer = new XMLSerializer();
    return serializer
      .serializeToString(xml)
      .replace('<?xml version="1.0"?>', '');
  }

  private arrayToXmlRecursive(array: Record<string, any>, xmlNode: Element) {
    for (const key in array) {
      if (array.hasOwnProperty(key)) {
        const value = array[key];
        if (Array.isArray(value)) {
          for (const item of value) {
            const subnode = xmlNode.appendChild(
              xmlNode.ownerDocument.createElement(key)
            );
            this.arrayToXmlRecursive(item, subnode);
          }
        } else if (typeof value === 'object' && value !== null) {
          const subnode = xmlNode.appendChild(
            xmlNode.ownerDocument.createElement(key)
          );
          this.arrayToXmlRecursive(value, subnode);
        } else {
          const subnode = xmlNode.appendChild(
            xmlNode.ownerDocument.createElement(key)
          );
          subnode.textContent =
            value === null || value === '' ? ' ' : String(value);
        }
      }
    }
  }

  private getSoapMethod(method: SeniorOptions[T], body: Record<string, any>) {
    return `<soapenv:Envelope
xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:ser="http://services.senior.com.br">
  <soapenv:Header/>
  <soapenv:Body>
    <ser:${method}>
      <user>${this.credentials.user}</user>
      <password>${this.credentials.password}</password>
      <encryption>${this.credentials.encryption}</encryption>
      ${this.arrayToXml(body, 'parameters')}
    </ser:${method}>
  </soapenv:Body>
</soapenv:Envelope>`;
  }

  private processSoapResult(response: string) {
    const result = new DOMParser()
      .parseFromString(response, 'text/xml')
      .getElementsByTagName('result')
      .item(0);
    const body: Record<string, any> = {};
    if (result)
      for (const child of Array.from(result.children))
        body[child.nodeName] = child.textContent;
    return body;
  }

  async sendRequest(method: SeniorOptions[T], body: Record<string, any>) {
    try {
      const response = await firstValueFrom(
        this.http.post(
          `/g5-senior-services/sapiens_sync/${this.service}`,
          this.getSoapMethod(method, body),
          {
            headers: new HttpHeaders({ 'Content-Type': 'text/xml' }),
            responseType: 'text',
          }
        )
      );

      return this.processSoapResult(response);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
