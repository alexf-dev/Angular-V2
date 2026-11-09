import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ApiProvider } from './api-provider.interface';

/**
 * BFF провайдер — использует новые агрегированные endpoints.
 * ВЫКЛЮЧЕН ПО УМОЛЧАНИЮ (useBff=false).
 *
 * Сейчас это ЗАГЛУШКА — все методы бросают ошибку.
 * Когда бэкенд готов, здесь будет реальная реализация.
 */
@Injectable({ providedIn: 'root' })
export class BffApiProvider implements ApiProvider {
  private readonly bffUrl = environment.bffUrl;

  constructor(private http: HttpClient) {}

  private throwNotImplemented(method: string): never {
    throw new Error(`[BFF] Method ${method} not implemented yet. Backend not ready.`);
  }

  // === CamundaService методы ===

  getById(id: number): Observable<any> {
    this.throwNotImplemented('getById');
  }

  getSocialByPatientId(patientId: number): Observable<any> {
    this.throwNotImplemented('getSocialByPatientId');
  }

  getExaminationByPatientId(patientId: number): Observable<any> {
    this.throwNotImplemented('getExaminationByPatientId');
  }

  getExpertOpinionById(expertOpinionId: number): Observable<any> {
    this.throwNotImplemented('getExpertOpinionById');
  }

  getGuardianByPatientId(patientId: number): Observable<any> {
    this.throwNotImplemented('getGuardianByPatientId');
  }

  getIprDataListByExpertOpinionId(expertOpinionId: number): Observable<any> {
    this.throwNotImplemented('getIprDataListByExpertOpinionId');
  }

  getDirectionList(expertOpinionId: number): Observable<any[]> {
    this.throwNotImplemented('getDirectionList');
  }

  getExpertOpinionByPatient(expertOpinionId: number): Observable<any | null> {
    this.throwNotImplemented('getExpertOpinionByPatient');
  }

  getDocuments(formId: number): Observable<any> {
    this.throwNotImplemented('getDocuments');
  }

  getOmkByPatientId(patientId: number): Observable<any> {
    this.throwNotImplemented('getOmkByPatientId');
  }

  getOmkByAppealId(appealId: number): Observable<any> {
    this.throwNotImplemented('getOmkByAppealId');
  }

  getMkbsVacations(expertId: number): Observable<any> {
    this.throwNotImplemented('getMkbsVacations');
  }

  getExpertOpinionByPatientId(patientId: number): Observable<any> {
    this.throwNotImplemented('getExpertOpinionByPatientId');
  }

  getExpertOpinionId(patientId: number): Observable<any> {
    this.throwNotImplemented('getExpertOpinionId');
  }

  getExpertOpinionByMainIdAndRepeat(mainId: number, repeat: number): Observable<any | null> {
    this.throwNotImplemented('getExpertOpinionByMainIdAndRepeat');
  }

  // === DictionaryService методы ===

  load(id: number, code: string): Observable<any[]> {
    this.throwNotImplemented('load');
  }

  loadRegion(code: string): Observable<any[]> {
    this.throwNotImplemented('loadRegion');
  }

  loadDHelp(code: string): Observable<any[]> {
    this.throwNotImplemented('loadDHelp');
  }

  loadWithCode(code: string): Observable<any[]> {
    this.throwNotImplemented('loadWithCode');
  }

  loadNameClasses(): Observable<any[]> {
    this.throwNotImplemented('loadNameClasses');
  }

  loadMkbByClass(classId: number): Observable<any[]> {
    this.throwNotImplemented('loadMkbByClass');
  }

  loadDisability(code: number, patientId: number): Observable<any[]> {
    this.throwNotImplemented('loadDisability');
  }

  loadDictWithCodeAndGroupId(id: number, code: string, groupId: number): Observable<any[]> {
    this.throwNotImplemented('loadDictWithCodeAndGroupId');
  }

  loadDDoctype(): Observable<any[]> {
    this.throwNotImplemented('loadDDoctype');
  }

  getFromCache(code: string): any[] {
    this.throwNotImplemented('getFromCache');
  }

  getMkbTree(code: string): Observable<any[]> {
    this.throwNotImplemented('getMkbTree');
  }

  getMse(): Observable<any[]> {
    this.throwNotImplemented('getMse');
  }

  // === PersonService методы ===

  getPerson(id: number): Observable<any> {
    this.throwNotImplemented('getPerson');
  }

  // === ImageContentService методы ===

  getImageContent(patientId: number): Observable<any[]> {
    this.throwNotImplemented('getImageContent');
  }

  // === Прямые вызовы из компонентов ===

  searchPatients(patientFilter: any): Observable<any[]> {
    this.throwNotImplemented('searchPatients');
  }

  getDeclarations(params: any): Observable<any[]> {
    this.throwNotImplemented('getDeclarations');
  }

  getExaminationsNao(params: any): Observable<any[]> {
    this.throwNotImplemented('getExaminationsNao');
  }

  sendGbdflByIin(iin: string): Observable<any> {
    this.throwNotImplemented('sendGbdflByIin');
  }
}
