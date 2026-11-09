# BFF API Contracts

## Обзор

Документ описывает контракты между Angular-клиентом и BFF (Backend for Frontend) сервисом.
BFF агрегирует вызовы к доменным сервисам и возвращает данные в формате, оптимизированном для конкретных экранов.

**Базовый URL:** `https://cbdi-bff.enbek.kz` (production) / `https://test-cbdi-bff.enbek.kz` (test)

**Версия API:** v1

**Формат ошибок:**
```json
{
  "error": "string",
  "code": "string",
  "details": {}
}
```

---

## 1. Expert Examination (Экспертное обследование)

### GET /api/bff/v1/expert-examination/{patientId}

**Описание:** Получить все данные для формы экспертного обследования (агрегация из нескольких сервисов).

**Агрегирует вызовы:**
- `GET /api/examination/patient/{id}` (CamundaService.getById)
- `GET /api/examination/social/{patientId}` (CamundaService.getSocialByPatientId)
- `GET /api/examination/examination/{patientId}` (CamundaService.getExaminationByPatientId)
- `GET /api/examination/guardian/{patientId}` (CamundaService.getGuardianByPatientId)
- `GET /api/examination/expertOpinion/{expertOpinionId}` (CamundaService.getExpertOpinionById)

**Response:**
```typescript
interface ExpertExaminationViewDTO {
  patient: Patient;
  socialData: SocialData;
  examination: Examination;
  guardian: Guardian;
  expertOpinion: Expertopinion | null;
}
```

---

### GET /api/bff/v1/expert-examination/{expertOpinionId}/documents

**Описание:** Получить документы для экспертного заключения.

**Агрегирует вызовы:**
- `GET /api/examination/documents/{formId}` (CamundaService.getDocuments)
- `GET /api/examination/ipr/{expertOpinionId}` (CamundaService.getIprDataListByExpertOpinionId)

**Response:**
```typescript
interface ExpertExaminationDocumentsViewDTO {
  documents: DocumentsListDto;
  iprData: IprDataList;
}
```

---

### GET /api/bff/v1/expert-examination/{expertOpinionId}/directions

**Описание:** Получить направления для экспертного заключения.

**Агрегирует вызовы:**
- `GET /api/examination/expert-opinions/direction/{expertOpinionId}` (CamundaService.getDirectionList)

**Response:**
```typescript
interface ExpertExaminationDirectionsViewDTO {
  directions: ExaminationDirectionDto[];
}
```

---

## 2. ОМК (Очно-медицинская комиссия)

### GET /api/bff/v1/omk/{patientId}

**Описание:** Получить данные для формы ОМК.

**Агрегирует вызовы:**
- `GET /api/omk/{patientId}` (CamundaService.getOmkByPatientId)
- `GET /api/omk/expert-opinion/{patientId}` (CamundaService.getExpertOpinionByPatientId)
- `GET /api/omk/consider/{patientId}` (CamundaService.getExpertOpinionId)

**Response:**
```typescript
interface OmkViewDTO {
  appeal: ReexaminationAppealDto;
  expertOpinion: ExpertOpinionOmk;
  expertOpinionSmall: ExpertOpinionSmallDto;
}
```

---

### GET /api/bff/v1/omk/appeal/{appealId}

**Описание:** Получить данные обращения по ID.

**Агрегирует вызовы:**
- `GET /api/omk/appeal/{appealId}` (CamundaService.getOmkByAppealId)

**Response:**
```typescript
interface OmkAppealViewDTO {
  appeal: ReexaminationAppealDto;
}
```

---

## 3. Реестр экспертов

### GET /api/bff/v1/reestr-experts/{expertId}/vacations

**Описание:** Получить отпуска эксперта.

**Агрегирует вызовы:**
- `GET /api/reestr-experts/mkbs-vacations/{expertId}` (CamundaService.getMkbsVacations)

**Response:**
```typescript
interface ExpertVacationsViewDTO {
  vacations: MkbsVacationsResponseDto;
}
```

---

### POST /api/bff/v1/reestr-experts/search

**Описание:** Поиск в реестре экспертов (фильтрация + пагинация).

**Агрегирует вызовы:**
- `POST /api/reestr-experts/search` (CamundaService.getReestrExperts)

**Request Body:**
```typescript
interface ReestrExpertsFilter {
  // поля фильтра из существующего DTO
}
```

**Response:**
```typescript
interface ReestrExpertsPageViewDTO {
  content: ReestrExpertsResponse[];
  totalElements: number;
  totalPages: number;
}
```

---

## 4. Справочники (Dictionary)

### GET /api/bff/v1/dictionary/{id}/{code}

**Описание:** Получить значения справочника с кэшированием на клиенте.

**Агрегирует вызовы:**
- `GET /dictionary/value/all/{id}` (DictionaryService.load)

**Response:**
```typescript
interface DictionaryValuesViewDTO {
  values: DictionaryValue[];
  cached: boolean; // true если данные из кэша
}
```

---

### GET /api/bff/v1/dictionary/region

**Описание:** Получить справочник регионов.

**Агрегирует вызовы:**
- `GET /dictionary/value/region` (DictionaryService.loadRegion)

**Response:**
```typescript
interface RegionDictionaryViewDTO {
  regions: DictionaryValue[];
}
```

---

### GET /api/bff/v1/dictionary/mkb10/tree

**Описание:** Получить дерево МКБ-10.

**Агрегирует вызовы:**
- `GET /dictionary/dict-mkb10/mkb-tree` (DictionaryService.getMkbTree)

**Response:**
```typescript
interface Mkb10TreeViewDTO {
  tree: NosologyTreeDto[];
}
```

---

### GET /api/bff/v1/dictionary/mkb10/class/{classId}

**Описание:** Получить нозологии по классу МКБ-10.

**Агрегирует вызовы:**
- `GET /dictionary/dict-mkb10/findByParNameClassesId/{classId}` (DictionaryService.loadMkbByClass)

**Response:**
```typescript
interface Mkb10ClassViewDTO {
  nosologies: DictionaryValue[];
}
```

---

### GET /api/bff/v1/dictionary/mse

**Описание:** Получить справочник МСЭ.

**Агрегирует вызовы:**
- `GET /dictionary/d-mse` (DictionaryService.getMse)

**Response:**
```typescript
interface MseDictionaryViewDTO {
  mse: MseDto[];
}
```

---

## 5. Персоны и пациенты

### GET /api/bff/v1/person/{id}

**Описание:** Получить данные персоны.

**Агрегирует вызовы:**
- `GET /api/person/{id}` (PersonService.getPerson)

**Response:**
```typescript
interface PersonViewDTO {
  person: PersonDto;
}
```

---

### POST /api/bff/v1/patients/search

**Описание:** Поиск пациентов с фильтрацией.

**Агрегирует вызовы:**
- `POST /api/person/search` (прямой вызов из patients-list.component.ts)

**Request Body:**
```typescript
interface PatientFilter {
  // поля фильтра
}
```

**Response:**
```typescript
interface PatientsSearchViewDTO {
  patients: Patient[];
}
```

---

### GET /api/bff/v1/kafka/gbdfl/{iin}

**Описание:** Отправить запрос в GBDFL по ИИН.

**Агрегирует вызовы:**
- `GET /api/kafka/send-gbdfl-by-iin/{iin}` (прямой вызов из gbdfl-find.component.ts)

**Response:**
```typescript
interface GbdflResponseViewDTO {
  person: PersonDto;
}
```

---

## 6. Декларации и обследования

### GET /api/bff/v1/declaration

**Описание:** Получить список деклараций с фильтрацией.

**Агрегирует вызовы:**
- `GET /api/declaration` (прямой вызов из gbdfl-find.component.ts)

**Request Params:**
```typescript
interface DeclarationFilter {
  // параметры фильтрации
}
```

**Response:**
```typescript
interface DeclarationsViewDTO {
  declarations: Declaration[];
}
```

---

### GET /api/bff/v1/examination/nao

**Описание:** Получить обследования НАО с фильтрацией.

**Агрегирует вызовы:**
- `GET /api/examination/nao` (прямой вызов из gbdfl-find.component.ts)

**Request Params:**
```typescript
interface ExaminationFilter {
  // параметры фильтрации
}
```

**Response:**
```typescript
interface ExaminationsViewDTO {
  examinations: Examination[];
}
```

---

## 7. Изображения

### GET /api/bff/v1/examination/image/{patientId}

**Описание:** Получить изображения для пациента.

**Агрегирует вызовы:**
- `GET /api/examination/image/{patientId}` (ImageContentService.getImageContent)

**Response:**
```typescript
interface ImageContentViewDTO {
  images: ImageContentDto[];
}
```

---

## Приоритет реализации для бэкенда

### Фаза 1 (Критичные экраны)
1. `GET /api/bff/v1/expert-examination/{patientId}` — основная форма обследования
2. `GET /api/bff/v1/dictionary/{id}/{code}` — справочники (используются везде)
3. `GET /api/bff/v1/dictionary/region` — регионы
4. `GET /api/bff/v1/dictionary/mkb10/tree` — МКБ-10

### Фаза 2 (Второстепенные экраны)
5. `GET /api/bff/v1/omk/{patientId}` — ОМК
6. `POST /api/bff/v1/reestr-experts/search` — реестр экспертов
7. `GET /api/bff/v1/person/{id}` — персоны

### Фаза 3 (Остальное)
8. Все остальные endpoints

---

## Замечания для бэкенда

1. **Параллелизация:** Внутри BFF вызовы к доменным сервисам должны выполняться параллельно (CompletableFuture / WebFlux) для минимизации latency.

2. **Кэширование:** Справочники (Dictionary) можно кэшировать на стороне BFF на 5-10 минут, так как они редко меняются.

3. **Обработка ошибок:** Если один из доменных сервисов вернул ошибку, BFF должен вернуть частичные данные с флагом `partial: true` и информацией об ошибке.

4. **Пагинация:** Для списковых endpoints (search, journals) использовать стандартную пагинацию Spring Data (page, size, sort).

5. **Авторизация:** BFF должен должен реализовывать авторизацию к доменным сервисам.
