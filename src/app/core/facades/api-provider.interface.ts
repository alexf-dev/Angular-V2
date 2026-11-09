import { Observable } from 'rxjs';
import { Patient } from '../model/patient';
import { SocialData } from '../model/social-data';
import { Examination } from '../model/examination';
import { Expertopinion } from '../model/expertopinion';
import { Guardian } from '../model/guardian';
import { IprDataList } from '../model/iprDataList';
import { ExaminationDirectionDto } from '../../dto/examination-direction-dto';
import { ExpertOpinionRequest } from '../model/expertopinion-dto';
import { DocumentsListDto } from '../model/documents-dto';
import { ReexaminationAppealDto } from '../../dto/omk/reexamination-appeal-dto';
import { MkbsVacationsResponseDto } from '../../dto/reestrExperts/mkbs-vacations-response-dto';
import { ExpertOpinionOmk } from '../../dto/omk/expert-opinion-omk';
import { ExpertOpinionSmallDto } from '../../dto/omk/expert-opinion-small-dto';
import { DictionaryValue } from '../model/dictionary-value';
import { DHelp } from '../../dto/dictionary/DHelp';
import { DDoctype } from '../model/dictionary/d-doctype';
import { NosologyTreeDto } from '../../dto/dictionary/nosology-tree-dto';
import { MseDto } from '../../dto/mse-dto';
import { PersonDto } from '../../dto/gbdfl-person-dto';
import { ImageContentDto } from '../model/image-content-dto';
import { Declaration } from '../model/declaration';

/**
 * Интерфейс провайдера API.
 * Определяет контракт для Legacy и BFF провайдеров.
 */
export interface ApiProvider {
  // === CamundaService методы ===

  getById(id: number): Observable<Patient>;
  getSocialByPatientId(patientId: number): Observable<SocialData>;
  getExaminationByPatientId(patientId: number): Observable<Examination>;
  getExpertOpinionById(expertOpinionId: number): Observable<Expertopinion>;
  getGuardianByPatientId(patientId: number): Observable<Guardian>;
  getIprDataListByExpertOpinionId(expertOpinionId: number): Observable<IprDataList>;
  getDirectionList(expertOpinionId: number): Observable<ExaminationDirectionDto[]>;
  getExpertOpinionByPatient(expertOpinionId: number): Observable<ExpertOpinionRequest | null>;
  getDocuments(formId: number): Observable<DocumentsListDto>;
  getOmkByPatientId(patientId: number): Observable<ReexaminationAppealDto>;
  getOmkByAppealId(appealId: number): Observable<ReexaminationAppealDto>;
  getMkbsVacations(expertId: number): Observable<MkbsVacationsResponseDto>;
  getExpertOpinionByPatientId(patientId: number): Observable<ExpertOpinionOmk>;
  getExpertOpinionId(patientId: number): Observable<ExpertOpinionSmallDto>;
  getExpertOpinionByMainIdAndRepeat(mainId: number, repeat: number): Observable<ExpertOpinionRequest | null>;

  // === DictionaryService методы (реальные названия) ===

  load(id: number, code: string): Observable<DictionaryValue[]>;
  loadRegion(code: string): Observable<DictionaryValue[]>;
  loadDHelp(code: string): Observable<DHelp[]>;
  loadWithCode(code: string): Observable<DictionaryValue[]>;
  loadNameClasses(): Observable<DictionaryValue[]>;
  loadMkbByClass(classId: number): Observable<DictionaryValue[]>;
  loadDisability(code: number, patientId: number): Observable<DictionaryValue[]>;
  loadDictWithCodeAndGroupId(id: number, code: string, groupId: number): Observable<DictionaryValue[]>;
  loadDDoctype(): Observable<DDoctype[]>;
  getFromCache(code: string): DictionaryValue[];
  getMkbTree(code: string): Observable<NosologyTreeDto[]>;
  getMse(): Observable<MseDto[]>;

  // === PersonService методы ===

  getPerson(id: number): Observable<PersonDto>;

  // === ImageContentService методы ===

  getImageContent(patientId: number): Observable<ImageContentDto[]>;

  // === Прямые вызовы из компонентов ===

  searchPatients(patientFilter: any): Observable<any[]>;
  getDeclarations(params: any): Observable<Declaration[]>;
  getExaminationsNao(params: any): Observable<Examination[]>;
  sendGbdflByIin(iin: string): Observable<PersonDto>;
}
