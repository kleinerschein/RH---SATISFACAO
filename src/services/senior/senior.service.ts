import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import SeniorHandler from "../soapHandler/senior-handler";

@Injectable({
  providedIn: 'root',
})
export class SeniorService {
  private senior;

  private seqImpSubject = new BehaviorSubject<string>('');
  private ideImpSubject = new BehaviorSubject<string>('');
  private statusSubject = new BehaviorSubject<number>(0);
  private idCrmSubject = new BehaviorSubject<number>(0);
  private statusTextSubject = new BehaviorSubject<string>('Sem Dados...');
  private desAmbiente = new BehaviorSubject<string>('');

  seqImp$ = this.seqImpSubject.asObservable();
  ideImp$ = this.ideImpSubject.asObservable();
  status$ = this.statusSubject.asObservable();
  statusText$ = this.statusTextSubject.asObservable();
  desAmbiente$ = this.desAmbiente.asObservable();
  idCrm = this.idCrmSubject.asObservable();

  status: number = 0;
  statusText: string = 'Sem Dados...';

  constructor(private http: HttpClient) {
    this.senior = new SeniorHandler(this.http, 'wksTeste');
  }
  async AuthenticateSapiens(usuario: string, senha: string) {
    const senior = new SeniorHandler(this.http, 'MCWFUsers');
    const { pmLogged } = await senior.sendRequest('AuthenticateJAAS', {
      pmUserName: usuario,
      pmUserPassword: senha,
      pmEncrypted: 0,
    });

    return pmLogged; // 0 = logado, 1 = não logado
  }

  async getUserGroup(usuario: string) {
    const senior = new SeniorHandler(this.http, 'MCWFUsers');
    const { pmGetUserGroupsResult } = await senior.sendRequest(
      'GetUserGroups',
      {
        pmGetUserGroupsUserName: usuario,
      }
    );
    return pmGetUserGroupsResult;
  }
}
