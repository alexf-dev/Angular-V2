import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiProvider } from './api-provider.interface';
import { CamundaService } from '../service/camunda.service';
import { DictionaryService } from '../service/dictionary.service';
import { PersonService } from '../service/person.service';
import { ImageContentService } from '../service/image-content.service';
import { ApiService } from '../api.service';

/**
 * Legacy провайдер — делегирует вызовы существующим сервисам.
 * Это ТОТ ЖЕ способ работы, что и сейчас.
 * Когда useBff=false, приложение работает через этот провайдер.
 */
@Injectable({ providedIn: 'root' })
export class LegacyApiProvider implements ApiProvider {
  constructor(
      private camundaService: CamundaService,
      private dictionaryService: DictionaryService,
      private personService: PersonService,
      private imageContentService: ImageContentService,
      private api: ApiService
  ) {}

  // === CamundaService методы (делегирование) ===

  getById(id: number): Observable<any> {
    return this.camundaService.getById(id);
  }

  getSocialByPatientId(patientId: number): Observable<any> {
    return this.camundaService.getSocialByPatientId(patientId);
  }

  getExaminationByPatientId(patientId: number): Observable<any> {
    return this.camundaService.getExaminationByPatientId(patientId);
  }

  getExpertOpinionById(expertOpinionId: number): Observable<any> {
    return this.camundaService.getExpertOpinionById(expertOpinionId);
  }

  getGuardianByPatientId(patientId: number): Observable<any> {
    return this.camundaService.getGuardianByPatientId(patientId);
  }

  getIprDataListByExpertOpinionId(expertOpinionId: number): Observable<any> {
    return this.camundaService.getIprDataListByExpertOpinionId(expertOpinionId);
  }

  getDirectionList(expertOpinionId: number): Observable<any[]> {
    return this.camundaService.getDirectionList(expertOpinionId);
  }

  getExpertOpinionByPatient(expertOpinionId: number): Observable<any | null> {
    return this.camundaService.getExpertOpinionByPatient(expertOpinionId);
  }

  getDocuments(formId: number): Observable<any> {
    return this.camundaService.getDocuments(formId);
  }

  getOmkByPatientId(patientId: number): Observable<any> {
    return this.camundaService.getOmkByPatientId(patientId);
  }

  getOmkByAppealId(appealId: number): Observable<any> {
    return this.camundaService.getOmkByAppealId(appealId);
  }

  getMkbsVacations(expertId: number): Observable<any> {
    return this.camundaService.getMkbsVacations(expertId);
  }

  getExpertOpinionByPatientId(patientId: number): Observable<any> {
    return this.camundaService.getExpertOpinionByPatientId(patientId);
  }

  getExpertOpinionId(patientId: number): Observable<any> {
    return this.camundaService.getExpertOpinionId(patientId);
  }

  getExpertOpinionByMainIdAndRepeat(mainId: number, repeat: number): Observable<any | null> {
    return this.camundaService.getExpertOpinionByMainIdAndRepeat(mainId, repeat);
  }

  // === DictionaryService методы (делегирование) ===

  load(id: number, code: string): Observable<any[]> {
    return this.dictionaryService.load(id, code);
  }

  loadRegion(code: string): Observable<any[]> {
    return this.dictionaryService.loadRegion(code);
  }

  loadDHelp(code: string): Observable<any[]> {
    return this.dictionaryService.loadDHelp(code);
  }

  loadWithCode(code: string): Observable<any[]> {
    return this.dictionaryService.loadWithCode(code);
  }

  loadNameClasses(): Observable<any[]> {
    return this.dictionaryService.loadNameClasses();
  }

  loadMkbByClass(classId: number): Observable<any[]> {
    return this.dictionaryService.loadMkbByClass(classId);
  }

  loadDisability(code: number, patientId: number): Observable<any[]> {
    return this.dictionaryService.loadDisability(code, patientId);
  }

  loadDictWithCodeAndGroupId(id: number, code: string, groupId: number): Observable<any[]> {
    return this.dictionaryService.loadDictWithCodeAndGroupId(id, code, groupId);
  }

  loadDDoctype(): Observable<any[]> {
    return this.dictionaryService.loadDDoctype();
  }

  getFromCache(code: string): any[] {
    return this.dictionaryService.getFromCache(code);
  }

  getMkbTree(code: string): Observable<any[]> {
    return this.dictionaryService.getMkbTree(code);
  }

  getMse(): Observable<any[]> {
    return this.dictionaryService.getMse();
  }

  // === PersonService методы (делегирование) ===

  getPerson(id: number): Observable<any> {
    return this.personService.getById(id);
  }

  // === ImageContentService методы (делегирование) ===

  getImageContent(patientId: number): Observable<any[]> {
    return this.imageContentService.getImageContentByPatientId(patientId);
  }

  // === Прямые вызовы из компонентов (через ApiService) ===

  searchPatients(patientFilter: any): Observable<any[]> {
    return this.api.post<any[]>('/api/person/search', patientFilter);
  }

  getDeclarations(params: any): Observable<any[]> {
    return this.api.get<any[]>('/api/declaration', params);
  }

  getExaminationsNao(params: any): Observable<any[]> {
    return this.api.get<any[]>('/api/examination/nao', params);
  }

  sendGbdflByIin(iin: string): Observable<any> {
    return this.api.get<any>(`/api/kafka/send-gbdfl-by-iin/${iin}`);
  }
}
