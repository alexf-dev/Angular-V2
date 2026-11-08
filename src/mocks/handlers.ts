import { http, HttpResponse } from 'msw';

export const handlers = [
  // === ТЕСТОВЫЕ МОКИ ДЛЯ ПРОВЕРКИ ИНТЕРСЕСПТОРА ===

  // Эмуляция 404 ошибки
  http.get('/api/test/404', () => {
    return HttpResponse.json(
      { error: 'Resource not found' },
      { status: 404, statusText: 'Not Found' }
    );
  }),

  // Эмуляция 500 ошибки
  http.get('/api/test/500', () => {
    return HttpResponse.json(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }),

  // Эмуляция 404 для POST (если хочешь проверить разные методы)
  http.post('/api/test/404', () => {
    return HttpResponse.json(
      { error: 'Resource not found' },
      { status: 404, statusText: 'Not Found' }
    );
  }),

  // Эмуляция 500 для POST
  http.post('/api/test/500', () => {
    return HttpResponse.json(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }),

  // Обычный моковый ответ
  http.get('/api/expert-examination/neurological-status', () => {
    return HttpResponse.json({ /* твои моковые данные */ });
  }),

  // Эмуляция 404 — заодно тестирует твой ErrorInterceptor
  http.get('/api/expert-examination/ophthalmology-data', () => {
    return HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),

  // Эмуляция 500
  http.post('/api/expert-examination/save', () => {
    return HttpResponse.json({ message: 'Server error' }, { status: 500 });
  }),

  http.get('*/api/examination/patient/:id', () => HttpResponse.json({
    id: 1,
    personId: {
      id: 1,
      surname: 'Иванов',
      firstName: 'Иван',
      secondName: 'Иванович',
      iin: '123456789012',
      birthDate: '1990-01-01',
      sex: { id: 1 },
      regTime: '2024-01-01T00:00:00',
      changeTime: '2024-01-01T00:00:00',
      addresses: null
    },
    phone: '+7 700 000 00 00',
    isTown: true,
    factAddress: 'г. Астана, ул. Тестовая, д. 1',
    districtId: 1
  })),

  // ===== approval-log: журнал согласований =====
  http.post('*/api/journal-approval/search', async ({ request }) => {
    const body: any = await request.json();
    const pageNum = body?.pageNum ?? 1;
    const pageSize = body?.pageSize ?? 10;

    const all: any[] = [
      { id: 1, patient: 'Иванов Иван Иванович', birthDate: '1990-01-15', conditionKz: 'Қарауда', conditionRu: 'На рассмотрении', beginDate: '2024-03-01', createDate: '2024-02-20', expert: 'Экспертов А.А.', statusId: 2111, expertOpinionId: 101 },
      { id: 2, patient: 'Петрова Анна Сергеевна', birthDate: '1985-06-20', conditionKz: 'Өңделген', conditionRu: 'Отработано', beginDate: '2024-03-05', createDate: '2024-02-25', expert: 'Экспертов Б.Б.', statusId: 2113, expertOpinionId: 102 },
      { id: 3, patient: 'Сидоров Пётр Петрович', birthDate: null, conditionKz: 'Тексеруде', conditionRu: 'На проверке', beginDate: null, createDate: '2024-03-10', expert: 'Экспертов В.В.', statusId: 2114, expertOpinionId: 103 },
      { id: 4, patient: 'Кузнецова Мария Ивановна', birthDate: '1992-11-30', conditionKz: 'Қарауда', conditionRu: 'На рассмотрении', beginDate: '2024-04-01', createDate: null, expert: 'Экспертов Г.Г.', statusId: 15198, expertOpinionId: 104 },
      { id: 5, patient: 'Соколов Дмитрий Алексеевич', birthDate: '1988-09-25', conditionKz: 'Өңделген', conditionRu: 'Отработано', beginDate: '2024-04-12', createDate: '2024-04-01', expert: 'Экспертов А.А.', statusId: 2111, expertOpinionId: 105 },
      { id: 6, patient: 'Михайлова Елена Викторовна', birthDate: '1995-03-10', conditionKz: 'Қарауда', conditionRu: 'На рассмотрении', beginDate: '2024-04-20', createDate: '2024-04-10', expert: 'Экспертов Б.Б.', statusId: 2113, expertOpinionId: 106 },
      { id: 7, patient: 'Новиков Сергей Павлович', birthDate: '1980-07-05', conditionKz: 'Тексеруде', conditionRu: 'На проверке', beginDate: '2024-05-02', createDate: '2024-04-25', expert: 'Экспертов В.В.', statusId: 2114, expertOpinionId: 107 },
      { id: 8, patient: 'Фёдорова Ольга Николаевна', birthDate: '1993-12-18', conditionKz: 'Өңделген', conditionRu: 'Отработано', beginDate: '2024-05-15', createDate: '2024-05-01', expert: 'Экспертов Г.Г.', statusId: 15198, expertOpinionId: 108 },
      { id: 9, patient: 'Морозов Андрей Владимирович', birthDate: '1987-02-28', conditionKz: 'Қарауда', conditionRu: 'На рассмотрении', beginDate: '2024-05-21', createDate: '2024-05-10', expert: 'Экспертов А.А.', statusId: 2111, expertOpinionId: 109 },
      { id: 10, patient: 'Волкова Татьяна Сергеевна', birthDate: '1991-08-08', conditionKz: 'Өңделген', conditionRu: 'Отработано', beginDate: '2024-06-01', createDate: '2024-05-20', expert: 'Экспертов Б.Б.', statusId: 2113, expertOpinionId: 110 },
      { id: 11, patient: 'Алексеев Владимир Михайлович', birthDate: '1984-04-14', conditionKz: 'Тексеруде', conditionRu: 'На проверке', beginDate: '2024-06-10', createDate: '2024-05-30', expert: 'Экспертов В.В.', statusId: 2114, expertOpinionId: 111 },
      { id: 12, patient: 'Егорова Наталья Петровна', birthDate: '1996-10-22', conditionKz: 'Қарауда', conditionRu: 'На рассмотрении', beginDate: '2024-06-18', createDate: '2024-06-01', expert: 'Экспертов Г.Г.', statusId: 15198, expertOpinionId: 112 }
    ];

    const start = (pageNum - 1) * pageSize;
    const list = all.slice(start, start + pageSize);

    return HttpResponse.json({ list, total: all.length, pageNum, pageSize });
  }),
  http.post('*/api/journal-approval/sign-and-update-status', () => HttpResponse.json('SUCCESS')),
  http.post('*/api/face-service/sign-with-face', () => HttpResponse.json({ status: 'OK' })),

  http.get('*/api/examination/social/:id', () => HttpResponse.json({
    id: 1,
    familyStId: 1,
    socEconomicStId: 1,
    floor: 3,
    isRampant: false,
    isHeating: true,
    isElevator: false,
    educationTypeId: 1,
    newProfessionId: 1,
    studyPlace: 'Школа № 1',
    isKindergarten: false,
    isSchool: true,
    isSpecSchool: false,
    isSpecKindergarten: false,
    harmfulFactors: []
  })),

  http.get('*/api/examination/examination/:id', () => HttpResponse.json({
    id: 1,
    beginDate: null,
    regNum: null,
    actNum: null,
    placeId: null,
    disgroupId: null,
    disreasonId: null,
    uot: null,
    upt: null,
    examDate: null,
    isNotHistory: false,
    isRepeat: false,
    isMigration: false,
    isNao: false,
    isAbroad: false,
    isBaikonur: false,
    directionDtos: []
  })),
  http.get('*/api/examination/guardian/:id', () => HttpResponse.json(null)),

  // ===== глобальные словари приложения (профиль/пациенты) =====
  http.get('*/dictionary/value/all/3', () => HttpResponse.json([
    { id: 1, nameRu: 'Мужской', nameKz: 'Ер' },
    { id: 2, nameRu: 'Женский', nameKz: 'Әйел' }
  ])),
  http.get('*/dictionary/value/all/44', () => HttpResponse.json([
    { id: 1, nameRu: 'Холост(а)', nameKz: 'Бойдақ/тұрмысқа шықпаған' },
    { id: 2, nameRu: 'Женат/замужем', nameKz: 'Үйленген/тұрмыста' }
  ])),
  http.get('*/dictionary/value/all/69', () => HttpResponse.json([
    { id: 1, nameRu: 'Работник', nameKz: 'Қызметкер' },
    { id: 2, nameRu: 'Пенсионер', nameKz: 'Зейнеткер' }
  ])),
  http.get('*/dictionary/value/all/48', () => HttpResponse.json([
    { id: 1, nameRu: 'Благоустроенное жильё', nameKz: 'Жайластырылған тұрғын үй' },
    { id: 2, nameRu: 'Частный дом', nameKz: 'Жеке үй' }
  ])),
  http.get('*/dictionary/value/all/107', () => HttpResponse.json([
    { id: 1, nameRu: 'Район 1', nameKz: 'Аудан 1' },
    { id: 2, nameRu: 'Район 2', nameKz: 'Аудан 2' }
  ])),
  http.get('*/dictionary/value/all/113', () => HttpResponse.json([
    { id: 1, nameRu: 'Фактор 1', nameKz: 'Фактор 1' },
    { id: 2, nameRu: 'Фактор 2', nameKz: 'Фактор 2' }
  ])),

  // ===== expert-conclusion: disability словари (3 кастомных эндпоинта) =====
  http.get('*/dictionary/value/disability/13/:patientId', () => HttpResponse.json([
    { id: 766, nameRu: 'I группа', nameKz: 'I топ' },
    { id: 767, nameRu: 'II группа', nameKz: 'II топ' },
    { id: 768, nameRu: 'III группа', nameKz: 'III топ' },
    { id: 769, nameRu: 'Категория "ребёнок-инвалид"', nameKz: '"Мүгедек бала" санаты' },
    { id: 771, nameRu: 'I группа (с детства)', nameKz: 'I топ (балалықтан)' },
    { id: 772, nameRu: 'II группа (с детства)', nameKz: 'II топ (балалықтан)' },
    { id: 773, nameRu: 'III группа (с детства)', nameKz: 'III топ (балалықтан)' },
    { id: 774, nameRu: 'Ребёнок-инвалид до 16 лет', nameKz: '16 жасқа дейінгі мүгедек бала' }
  ])),
  http.get('*/dictionary/value/disability/26/:patientId', () => HttpResponse.json([
    { id: 1072, nameRu: '6 месяцев', nameKz: '6 ай' },
    { id: 1073, nameRu: '1 год', nameKz: '1 жыл' },
    { id: 1074, nameRu: '2 года', nameKz: '2 жыл' },
    { id: 1075, nameRu: '5 лет', nameKz: '5 жыл' },
    { id: 1076, nameRu: 'Бессрочно', nameKz: 'Мерзімсіз' },
    { id: 1077, nameRu: 'До 16 лет', nameKz: '16 жасқа дейін' }
  ])),
  http.get('*/dictionary/value/disability/14/:patientId', () => HttpResponse.json([
    { id: 1, nameRu: 'Общее заболевание', nameKz: 'Жалпы ауру' },
    { id: 2, nameRu: 'Трудовое увечье', nameKz: 'Еңбек жарақаты' },
    { id: 3, nameRu: 'Профессиональное заболевание', nameKz: 'Кәсіби ауру' },
    { id: 4, nameRu: 'Инвалидность с детства', nameKz: 'Балалықтан мүгедектік' },
    { id: 5, nameRu: 'Военная травма', nameKz: 'Әскери жарақат' }
  ])),

  http.get('*/dictionary/value/all/53', () => HttpResponse.json([
    { id: 0, nameRu: 'Нет нарушений', nameKz: 'Бұзылыстар жоқ' },
    { id: 1, nameRu: 'Незначительные нарушения', nameKz: 'Жеңіл бұзылыстар' },
    { id: 2, nameRu: 'Умеренные нарушения', nameKz: 'Орташа бұзылыстар' },
    { id: 3, nameRu: 'Выраженные нарушения', nameKz: 'Айқын бұзылыстар' },
    { id: 4, nameRu: 'Значительно выраженные нарушения', nameKz: 'Едәуір айқын бұзылыстар' }
  ])),

  // ===== completed-work-acts =====
  http.get('*/api/completed-work-acts/getExpertId', () => HttpResponse.json(1)),
  http.get('*/api/completed-work-acts/dic-years/:expertId', () => HttpResponse.json([
    { id: 1, nameRu: '2024', nameKz: '2024' },
    { id: 2, nameRu: '2023', nameKz: '2023' }
  ])),
  http.get('*/api/completed-work-acts/dic-months/:year/:expertId', () => HttpResponse.json([
    { id: 1, nameRu: 'Январь', nameKz: 'Қаңтар' },
    { id: 2, nameRu: 'Февраль', nameKz: 'Ақпан' }
  ])),
  http.post('*/api/completed-work-acts/all', async ({ request }) => {
    const body: any = await request.json();
    const pageNum = body?.pageNum ?? 1;
    const pageSize = body?.pageSize ?? 10;

    const all: any[] = [
      { id: 1, regionRu: 'г. Астана', period: '01.2024', expertFullName: 'Экспертов А.А.', rdate: '2024-01-15T10:00:00', expertDate: '2024-01-20T14:30:00', bossRevisionDate: null, expRevisionDate: null, bossFullName: 'Начальник Б.Б.', bossDate: '2024-01-25T09:00:00', status: 3, deadline: '2024-02-01' },
      { id: 2, regionRu: 'г. Алматы', period: '02.2024', expertFullName: 'Экспертов В.В.', rdate: '2024-02-10T11:00:00', expertDate: null, bossRevisionDate: '2024-02-15T16:00:00', expRevisionDate: '2024-02-20T10:00:00', bossFullName: 'Начальник Г.Г.', bossDate: null, status: 4, deadline: '2024-03-01' },
      { id: 3, regionRu: 'г. Шымкент', period: '03.2024', expertFullName: 'Экспертов Д.Д.', rdate: '2024-03-05T09:00:00', expertDate: '2024-03-10T13:00:00', bossRevisionDate: null, expRevisionDate: null, bossFullName: 'Начальник Е.Е.', bossDate: '2024-03-15T11:00:00', status: 2, deadline: '2024-04-01' },
      { id: 4, regionRu: 'г. Караганда', period: '04.2024', expertFullName: 'Экспертов Ж.Ж.', rdate: '2024-04-01T10:00:00', expertDate: null, bossRevisionDate: null, expRevisionDate: null, bossFullName: null, bossDate: null, status: 1, deadline: null },
      { id: 5, regionRu: 'г. Астана', period: '05.2024', expertFullName: 'Экспертов З.З.', rdate: '2024-05-10T12:00:00', expertDate: '2024-05-15T15:00:00', bossRevisionDate: '2024-05-20T09:00:00', expRevisionDate: null, bossFullName: 'Начальник И.И.', bossDate: null, status: 4, deadline: '2024-06-01' }
    ];

    const start = (pageNum - 1) * pageSize;
    const list = all.slice(start, start + pageSize);

    return HttpResponse.json({ list, total: all.length, pageNum, pageSize });
  }),
  http.post('*/api/document-generation/internal/v1/generateDocument', () => HttpResponse.json({ content: btoa('%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n190\n%%EOF') })),
  http.post('*/api/completed-work-acts/saveSignedAct', () => HttpResponse.json({ success: true })),
  http.get('*/dictionary/value/all/105', () => HttpResponse.json([
    { id: 1, nameRu: 'г. Астана', nameKz: 'Астана қ.' },
    { id: 2, nameRu: 'г. Алматы', nameKz: 'Алматы қ.' }
  ])),
  http.get('*/dictionary/value/all/152', () => HttpResponse.json([
    { id: 1, nameRu: 'Проект', nameKz: 'Жоба' },
    { id: 2, nameRu: 'Согласован экспертом', nameKz: 'Сарапшымен келісілді' },
    { id: 3, nameRu: 'Утверждён', nameKz: 'Бекітілді' },
    { id: 4, nameRu: 'На доработке', nameKz: 'Қайта өңдеуде' }
  ])),

  // ===== reestr-experts =====
  http.post('*/api/reestr-experts/search', async ({ request }) => {
    const body: any = await request.json();
    const pageNum = body?.pageNum ?? 1;
    const pageSize = body?.pageSize ?? 10;

    const all: any[] = [
      { id: 1, empFullName: 'Экспертов Алексей Алексеевич', iin: '123456789012', region: { id: 1, nameRu: 'г. Астана', nameKz: 'Астана қ.' }, workPlace: 'МСЭ №1', mseWorkExperience: '5 лет', dateOfEmployment: '2020-01-15', dateOfDismissal: null, status: { id: 14972, nameRu: 'Включён', nameKz: 'Енгізілді' } },
      { id: 2, empFullName: 'Экспертова Мария Ивановна', iin: '234567890123', region: { id: 2, nameRu: 'г. Алматы', nameKz: 'Алматы қ.' }, workPlace: 'МСЭ №2', mseWorkExperience: '3 года', dateOfEmployment: '2021-06-01', dateOfDismissal: null, status: { id: 14971, nameRu: 'На рассмотрении', nameKz: 'Қарауда' } },
      { id: 3, empFullName: 'Экспертов Пётр Петрович', iin: '345678901234', region: { id: 1, nameRu: 'г. Астана', nameKz: 'Астана қ.' }, workPlace: 'МСЭ №3', mseWorkExperience: '7 лет', dateOfEmployment: '2018-03-10', dateOfDismissal: '2023-12-31', status: { id: 14969, nameRu: 'Исключён', nameKz: 'Шығарылды' } },
      { id: 4, empFullName: 'Экспертова Анна Сергеевна', iin: '456789012345', region: { id: 2, nameRu: 'г. Алматы', nameKz: 'Алматы қ.' }, workPlace: 'МСЭ №4', mseWorkExperience: '2 года', dateOfEmployment: '2022-09-01', dateOfDismissal: null, status: { id: 14972, nameRu: 'Включён', nameKz: 'Енгізілді' } },
      { id: 5, empFullName: 'Экспертов Дмитрий Дмитриевич', iin: '567890123456', region: { id: 1, nameRu: 'г. Астана', nameKz: 'Астана қ.' }, workPlace: 'МСЭ №5', mseWorkExperience: '4 года', dateOfEmployment: '2020-11-15', dateOfDismissal: null, status: { id: 14975, nameRu: 'Отклонён', nameKz: 'Қабылданбады' } }
    ];

    const start = (pageNum - 1) * pageSize;
    const list = all.slice(start, start + pageSize);

    return HttpResponse.json({ list, total: all.length, pageNum, pageSize });
  }),
  http.get('*/api/reestr-experts/mkbs-vacations/:expertId', () => HttpResponse.json({
    mkbs: ['A00', 'B01', 'C02'],
    vacations: ['01.07.2024 - 14.07.2024', '15.12.2024 - 28.12.2024'],
    fieldSessions: ['01.09.2024 - 10.09.2024'],
    temporaryDisability: ['01.03.2024 - 10.03.2024']
  })),
  http.put('*/api/reestr-experts/update-status-expert', () => HttpResponse.json({ success: true })),
  http.get('*/dictionary/value/all/127', () => HttpResponse.json([
    { id: 14969, nameRu: 'Исключён', nameKz: 'Шығарылды' },
    { id: 14970, nameRu: 'Исключён (подтверждён)', nameKz: 'Шығарылды (расталды)' },
    { id: 14971, nameRu: 'На рассмотрении', nameKz: 'Қарауда' },
    { id: 14972, nameRu: 'Включён', nameKz: 'Енгізілді' },
    { id: 14974, nameRu: 'Отклонён (исключение)', nameKz: 'Қабылданбады (шығару)' },
    { id: 14975, nameRu: 'Отклонён (включение)', nameKz: 'Қабылданбады (енгізу)' }
  ])),

  // ===== reestr-ie-experts =====
  http.post('*/api/reestr-ie-experts/search', async ({ request }) => {
    const body: any = await request.json();
    const pageNum = body?.pageNum ?? 1;
    const pageSize = body?.pageSize ?? 10;

    const all: any[] = [
      { id: 1, empFullName: 'ИЭ-Экспертов Алексей Алексеевич', iin: '111111111111', region: { id: 1, nameRu: 'г. Астана', nameKz: 'Астана қ.' }, workPlace: 'МСЭ-ИЭ №1', mseWorkExperience: '5 лет', dateOfEmployment: '2020-01-15', dateOfDismissal: null, status: { id: 14972, nameRu: 'Включён', nameKz: 'Енгізілді' } },
      { id: 2, empFullName: 'ИЭ-Экспертова Мария Ивановна', iin: '222222222222', region: { id: 2, nameRu: 'г. Алматы', nameKz: 'Алматы қ.' }, workPlace: 'МСЭ-ИЭ №2', mseWorkExperience: '3 года', dateOfEmployment: '2021-06-01', dateOfDismissal: null, status: { id: 14970, nameRu: 'Исключён (подтверждён)', nameKz: 'Шығарылды (расталды)' } },
      { id: 3, empFullName: 'ИЭ-Экспертов Пётр Петрович', iin: '333333333333', region: { id: 1, nameRu: 'г. Астана', nameKz: 'Астана қ.' }, workPlace: 'МСЭ-ИЭ №3', mseWorkExperience: '7 лет', dateOfEmployment: '2018-03-10', dateOfDismissal: '2023-12-31', status: { id: 14972, nameRu: 'Включён', nameKz: 'Енгізілді' } }
    ];

    const start = (pageNum - 1) * pageSize;
    const list = all.slice(start, start + pageSize);

    return HttpResponse.json({ list, total: all.length, pageNum, pageSize });
  }),
  http.post('*/api/reestr-ie-experts/exclude', () => HttpResponse.json({ success: true })),
  http.get('*/dictionary/value/all/137', () => HttpResponse.json([
    { id: 15120, code: '004', nameRu: 'Систематическое невыполнение установленного планового показателя', nameKz: 'Жүйелі түрде орындалмау' },
    { id: 15121, code: '005', nameRu: 'По результатам ежемесячной/годовой оценки', nameKz: 'Ай сайынғы/жыл сайынғы бағалау нәтижелері бойынша' }
  ])),

  // ===== absentee-examination: журнал зарегистрированных актов =====
  http.post('*/api/registered-acts/search', async ({ request }) => {
    const body: any = await request.json();
    const pageNum = body?.pageNum ?? 1;
    const pageSize = body?.pageSize ?? 10;

    const all: any[] = [
      { formId: 101, numberAkt: 'ACT-2024-001', deadlineStartDate: '2024-03-01', rdate: '2024-02-15', direction: 'Первичное освидетельствование', dataOfBirth: '1990-01-15', ageAtResolution: 34, genderId: 1, mainDiagnosis: 'I10 Гипертензия', deadlineEndDate: '2024-03-15' },
      { formId: 102, numberAkt: 'ACT-2024-002', deadlineStartDate: '2024-03-05', rdate: '2024-02-20', direction: 'Повторное освидетельствование', dataOfBirth: '1985-06-20', ageAtResolution: 39, genderId: 2, mainDiagnosis: 'E11 Диабет', deadlineEndDate: '2024-03-20' },
      { formId: 103, numberAkt: 'ACT-2024-003', deadlineStartDate: '2024-03-10', rdate: '2024-02-25', direction: 'Первичное освидетельствование', dataOfBirth: null, ageAtResolution: 45, genderId: 1, mainDiagnosis: 'M54 Дорсалгия', deadlineEndDate: '2024-03-25' },
      { formId: 104, numberAkt: 'ACT-2024-004', deadlineStartDate: '2024-04-01', rdate: '2024-03-15', direction: 'Повторное освидетельствование', dataOfBirth: '1978-11-30', ageAtResolution: 46, genderId: 2, mainDiagnosis: 'J45 Астма', deadlineEndDate: '2024-04-15' },
      { formId: 105, numberAkt: 'ACT-2024-005', deadlineStartDate: '2024-04-12', rdate: '2024-03-20', direction: 'Первичное освидетельствование', dataOfBirth: '1992-09-25', ageAtResolution: 32, genderId: 1, mainDiagnosis: 'K21 ГЭРБ', deadlineEndDate: '2024-04-25' },
      { formId: 106, numberAkt: 'ACT-2024-006', deadlineStartDate: '2024-04-20', rdate: '2024-03-25', direction: 'Повторное освидетельствование', dataOfBirth: '1988-02-28', ageAtResolution: 36, genderId: 2, mainDiagnosis: 'N18 ХБП', deadlineEndDate: '2024-05-05' },
      { formId: 107, numberAkt: 'ACT-2024-007', deadlineStartDate: '2024-05-02', rdate: '2024-04-10', direction: 'Первичное освидетельствование', dataOfBirth: '1995-03-10', ageAtResolution: 29, genderId: 1, mainDiagnosis: 'F32 Депрессия', deadlineEndDate: '2024-05-15' },
      { formId: 108, numberAkt: 'ACT-2024-008', deadlineStartDate: '2024-05-15', rdate: '2024-04-20', direction: 'Повторное освидетельствование', dataOfBirth: '1980-07-05', ageAtResolution: 44, genderId: 2, mainDiagnosis: 'I25 ИБС', deadlineEndDate: '2024-05-30' },
      { formId: 109, numberAkt: 'ACT-2024-009', deadlineStartDate: '2024-05-21', rdate: '2024-04-25', direction: 'Первичное освидетельствование', dataOfBirth: '1993-12-18', ageAtResolution: 31, genderId: 1, mainDiagnosis: 'M17 Артроз', deadlineEndDate: '2024-06-05' },
      { formId: 110, numberAkt: 'ACT-2024-010', deadlineStartDate: '2024-06-01', rdate: '2024-05-10', direction: 'Повторное освидетельствование', dataOfBirth: '1987-08-08', ageAtResolution: 37, genderId: 2, mainDiagnosis: 'E03 Гипотиреоз', deadlineEndDate: '2024-06-15' },
      { formId: 111, numberAkt: 'ACT-2024-011', deadlineStartDate: '2024-06-10', rdate: '2024-05-20', direction: 'Первичное освидетельствование', dataOfBirth: '1984-04-14', ageAtResolution: 40, genderId: 1, mainDiagnosis: 'G43 Мигрень', deadlineEndDate: '2024-06-25' },
      { formId: 112, numberAkt: 'ACT-2024-012', deadlineStartDate: '2024-06-18', rdate: '2024-05-30', direction: 'Повторное освидетельствование', dataOfBirth: '1996-10-22', ageAtResolution: 28, genderId: 2, mainDiagnosis: 'L30 Дерматит', deadlineEndDate: '2024-07-01' }
    ];

    const start = (pageNum - 1) * pageSize;
    const list = all.slice(start, start + pageSize);

    return HttpResponse.json({ list, total: all.length, pageNum, pageSize });
  }),
  http.get('*/api/examination/expert-opinions/mainId/:mainId/repeat/:repeat', () => HttpResponse.json({ id: 999 })),

  // ===== msk-request: заявление МСЭ =====
  http.get('*/api/declaration/:id', ({ params }) => HttpResponse.json({
    id: Number(params['id']),
    iin: '031230650906',
    guardianIin: '041230650907',
    socialSecurityCode: '1',
    status: 'NEW',
    jsonData: null
  })),
  http.put('*/api/declaration', async ({ request }) => {
    const body: any = await request.json();
    return HttpResponse.json({ ...body, id: body?.id ?? 1 });
  }),
  http.post('*/api/doc/declaration', () => {
    const pdfContent = '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n190\n%%EOF';
    return new HttpResponse(new Blob([pdfContent], { type: 'application/pdf' }));
  }),
  http.get('*/api/kafka/send-gbdfl-by-iin/:iin', ({ params }) => HttpResponse.json({
    iin: params['iin'],
    surname: 'Айсина',
    firstName: 'Назира',
    secondName: 'Жұбанқызы'
  })),
  http.get('*/dictionary/value/all/138', () => HttpResponse.json([
    { id: 1, nameRu: 'Удостоверение личности', nameKz: 'Жеке куәлік' },
    { id: 2, nameRu: 'Направление на МСЭ', nameKz: 'МСЭ-ға жолдама' },
    { id: 3, nameRu: 'Медицинская карта', nameKz: 'Медициналық карта' },
    { id: 4, nameRu: 'Акт производственной травмы', nameKz: 'Өндірістік жарақат актісі' }
  ])),

  // ===== expert-conclusion: классы болезней и МКБ =====
  http.get('*/dictionary/dict-nameclasses/all', () => HttpResponse.json([
    { id: 1, nameRu: 'I. Инфекционные и паразитарные болезни', nameKz: 'I. Жұқпалы және паразиттік аурулар' },
    { id: 2, nameRu: 'II. Новообразования', nameKz: 'II. Жаңа түзілімдер' },
    { id: 5, nameRu: 'V. Психические расстройства', nameKz: 'V. Психикалық бұзылыстар' },
    { id: 9, nameRu: 'IX. Болезни системы кровообращения', nameKz: 'IX. Қан айналымы жүйесінің аурулары' },
    { id: 11, nameRu: 'XI. Болезни костно-мышечной системы', nameKz: 'XI. Сүйек-бұлшықет жүйесінің аурулары' }
  ])),
  http.get('*/dictionary/dict-mkb10/findByParNameClassesId/:classId', ({ params }) => {
    const classId = Number(params['classId']);
    const mkbByClass: Record<number, any[]> = {
      1: [
        { id: 101, nameRu: 'A00 Холера', nameKz: 'A00 Холера' },
        { id: 102, nameRu: 'A15 Туберкулёз органов дыхания', nameKz: 'A15 Тыныс алу органдарының туберкулёзі' }
      ],
      2: [
        { id: 201, nameRu: 'C34 Злокачественное новообразование бронхов и лёгкого', nameKz: 'C34 Бронхтар мен өкпенің қатерлі ісігі' },
        { id: 202, nameRu: 'D50 Железодефицитная анемия', nameKz: 'D50 Темір тапшы анемиясы' }
      ],
      5: [
        { id: 501, nameRu: 'F20 Шизофрения', nameKz: 'F20 Шизофрения' },
        { id: 502, nameRu: 'F32 Депрессивный эпизод', nameKz: 'F32 Депрессиялық эпизод' }
      ],
      9: [
        { id: 901, nameRu: 'I10 Эссенциальная гипертензия', nameKz: 'I10 Эссенциалды гипертензия' },
        { id: 902, nameRu: 'I25 Хроническая ишемическая болезнь сердца', nameKz: 'I25 Жүректің созылмалы ишемиялық ауруы' }
      ],
      11: [
        { id: 1101, nameRu: 'M17 Артроз коленного сустава', nameKz: 'M17 Тізе буынының артрозы' },
        { id: 1102, nameRu: 'M54 Дорсопатия', nameKz: 'M54 Дорсопатия' }
      ]
    };
    return HttpResponse.json(mkbByClass[classId] ?? []);
  }),

  http.get('*/dictionary/value/all/15', () => {
    console.log('[MOCK HIT] dictionary 15');
    return HttpResponse.json([
      { id: 801, nameRu: 'Продление листка нетрудоспособности', nameKz: 'Еңбекке қабілетсіздік парағын ұзарту' },
      { id: 802, nameRu: 'Установление инвалидности', nameKz: 'Мүгедектікті белгілеу' },
      { id: 803, nameRu: 'Переосвидетельствование', nameKz: 'Қайта куәландыру' },
      { id: 804, nameRu: 'Досрочное переосвидетельствование', nameKz: 'Мерзімінен бұрын қайта куәландыру' },
      { id: 805, nameRu: 'Установление упт первично', nameKz: 'Е ТЖ алғашқы белгілеу' },
      { id: 806, nameRu: 'Установление упт повторно', nameKz: 'Е ТЖ қайталап белгілеу' },
      { id: 807, nameRu: 'Установление упт первично', nameKz: 'Е ТЖ алғашқы белгілеу' },
      { id: 808, nameRu: 'Установление упт повторно', nameKz: 'Е ТЖ қайталап белгілеу' },
      { id: 809, nameRu: 'Определение дополнительных видов помощи', nameKz: 'Қосымша көмек түрлерін айқындау' },
      { id: 810, nameRu: 'Изменение причины инвалидности', nameKz: 'Мүгедектік себебін өзгерту' },
      { id: 811, nameRu: 'Формирование ИПР', nameKz: 'ИПР қалыптастыру' },
      { id: 812, nameRu: 'Коррекция ИПР', nameKz: 'ИПР түзету' }
    ]);
  }),

  // ===== expert-conclusion: словари с бизнес-логикой =====
  http.get('*/dictionary/value/all/19', () => HttpResponse.json([
    { id: 861, parId: null, nameRu: 'Категория 861 (скрытая)', nameKz: '861' },
    { id: 862, parId: null, nameRu: 'Категория 862 (скрытая)', nameKz: '862' },
    { id: 863, parId: null, nameRu: 'Категория 863 (скрытая)', nameKz: '863' },
    { id: 871, parId: 861, nameRu: 'Ограничение жизнедеятельности 1 степени', nameKz: '1 дәреже' },
    { id: 872, parId: 862, nameRu: 'Ограничение жизнедеятельности 2 степени', nameKz: '2 дәреже' },
    { id: 873, parId: 863, nameRu: 'Ограничение жизнедеятельности 3 степени', nameKz: '3 дәреже' }
  ])),
  http.get('*/dictionary/value/all/20', () => HttpResponse.json([
    { id: 891, nameRu: 'Краткое обоснование 891', nameKz: '891' },
    { id: 892, nameRu: 'Краткое обоснование 892', nameKz: '892' },
    { id: 893, nameRu: 'Краткое обоснование 893', nameKz: '893' },
    { id: 894, nameRu: 'Краткое обоснование 894', nameKz: '894' },
    { id: 895, nameRu: 'Краткое обоснование 895', nameKz: '895' },
    { id: 896, nameRu: 'Краткое обоснование 896', nameKz: '896' }
  ])),
  http.get('*/dictionary/value/all/21', () => HttpResponse.json([
    { id: 897, nameRu: 'Дефект 897', nameKz: '897' },
    { id: 898, nameRu: 'Дефект 898', nameKz: '898' },
    { id: 908, nameRu: 'Дефект 908 (базово отключён)', nameKz: '908' },
    { id: 909, nameRu: 'Дефект 909', nameKz: '909' },
    { id: 910, nameRu: 'Дефект 910', nameKz: '910' },
    { id: 911, nameRu: 'Дефект 911', nameKz: '911' },
    { id: 912, nameRu: 'Дефект 912', nameKz: '912' },
    { id: 926, nameRu: 'Дефект 926', nameKz: '926' },
    { id: 927, nameRu: 'Дефект 927', nameKz: '927' },
    { id: 929, nameRu: 'Дефект 929 (исключительный)', nameKz: '929' },
    { id: 930, nameRu: 'Дефект 930 (доп. информация)', nameKz: '930' }
  ])),
  http.get('*/dictionary/value/all/22', () => HttpResponse.json([
    { id: 931, parId: null, code: '931', nameRu: 'Общие дефекты', nameKz: '931' },
    { id: 947, parId: 931, code: '947', nameRu: 'Психические умеренные', nameKz: '947' },
    { id: 948, parId: 931, code: '948', nameRu: 'Двигательные выраженные', nameKz: '948' },
    { id: 932, parId: null, code: '932', nameRu: 'Верхние конечности', nameKz: '932' },
    { id: 938, parId: 932, code: '938', nameRu: 'Дефект 938', nameKz: '938' },
    { id: 939, parId: 932, code: '939', nameRu: 'Дефект 939', nameKz: '939' },
    { id: 933, parId: null, code: '933', nameRu: 'Нижние конечности', nameKz: '933' },
    { id: 940, parId: 933, code: '940', nameRu: 'Дефект 940', nameKz: '940' },
    { id: 941, parId: 933, code: '941', nameRu: 'Дефект 941', nameKz: '941' },
    { id: 937, parId: null, code: '937', nameRu: 'Прочие дефекты', nameKz: '937' },
    { id: 949, parId: 937, code: '949', nameRu: 'Дефект 949', nameKz: '949' },
    { id: 963, parId: 937, code: '963', nameRu: 'Дефект 963', nameKz: '963' }
  ])),
  http.get('*/dictionary/value/all/17', () => HttpResponse.json([
    { id: 820, nameRu: '6 месяцев', nameKz: '6 ай' },
    { id: 821, nameRu: '1 год', nameKz: '1 жыл' },
    { id: 822, nameRu: '2 года', nameKz: '2 жыл' },
    { id: 827, nameRu: '5 лет', nameKz: '5 жыл' },
    { id: 823, nameRu: 'До 16 лет', nameKz: '16 жасқа дейін' },
    { id: 824, nameRu: 'Бессрочно', nameKz: 'Мерзімсіз' }
  ])),


  // ===== expert-conclusion: DTO заключения и освидетельствование =====
  http.get('*/api/examination/expert-opinions/:id', () => HttpResponse.json({
    id: 1,
    patientId: 1,
    nameClassesId: 9,
    diseaseMkb: 901,
    mainDiagnosis: 'I10 Эссенциальная (первичная) гипертензия',
    relatedDiseasesId: null,
    sequela: '',
    validity: 1,
    disabilityGroupId: null,
    termReceived: null,
    deadlineId: null,
    disabEstForPeriodTo: null,
    reasonDisabilityAccordForm7: null,
    reasonforDisability: null,
    uotDegree: null,
    deadline2Id: null,
    uotDegreeSetTo: null,
    termUotReceived: null,
    reexaminationDate: null,
    medicalRehabilation: '',
    socialRehabilation: '',
    profRehabilation: '',
    dynamicObservationId: null,
    iprSoc: false,
    iprMed: false,
    directionDtos: [{ directionId: 801 }],
    justification: [],
    limitation: [],
    defects: [],
    irreversibleDefects: [],
    uptData: [],
    mental: null,
    sensor: null,
    stato: null,
    circulation: null
  })),
  http.get('*/api/examination/examination/:patientId', () => HttpResponse.json({
    id: 1,
    patientId: 1,
    beginDate: '2026-11-01T00:00:00',
    endDate: null
  })),

  // ===== OMK: committee-request-form (действия комитета) =====
  http.put('*/api/omk/update-appeal-status', () => HttpResponse.json(1)),
  http.post('*/api/omk/consider/:expertOpinionId/:appealId', () => HttpResponse.json(999)),
  http.get('*/api/examination/image/pdf/:id', () => {
    const pdfContent = '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n190\n%%EOF';
    return new HttpResponse(new Blob([pdfContent], { type: 'application/pdf' }));
  }),

  // ===== OMK: resolution-approved (журнал сводных решений) =====
  http.post('*/api/resolution-approved/search', async ({ request }) => {
    const body: any = await request.json();
    const pageNum = body?.pageNum ?? 1;
    const pageSize = body?.pageSize ?? 10;

    const all: any[] = [
      { id: 1, actNumber: 'RES-2024-001', iin: '123456789012', fio: 'Иванов Иван Иванович', dateOfBirth: '1990-01-15', patientId: 1, exp1Id: 101, exp2Id: 102, exp3Id: 103, finalDecision: 201 },
      { id: 2, actNumber: 'RES-2024-002', iin: '234567890123', fio: 'Петрова Анна Сергеевна', dateOfBirth: '1985-06-20', patientId: 2, exp1Id: 104, exp2Id: 105, exp3Id: 106, finalDecision: 202 },
      { id: 3, actNumber: 'RES-2024-003', iin: '345678901234', fio: 'Сидоров Пётр Петрович', dateOfBirth: '1978-11-30', patientId: 3, exp1Id: 107, exp2Id: 108, exp3Id: 109, finalDecision: 203 },
      { id: 4, actNumber: 'RES-2024-004', iin: '456789012345', fio: null, dateOfBirth: '1995-03-10', patientId: 4, exp1Id: 110, exp2Id: 111, exp3Id: 112, finalDecision: 204 },
      { id: 5, actNumber: 'RES-2024-005', iin: '567890123456', fio: 'Кузнецова Мария Ивановна', dateOfBirth: '1982-09-25', patientId: 5, exp1Id: 113, exp2Id: 114, exp3Id: 115, finalDecision: 205 }
    ];

    const start = (pageNum - 1) * pageSize;
    const list = all.slice(start, start + pageSize);

    return HttpResponse.json({ list, total: all.length, pageNum, pageSize });
  }),

  http.get('*/api/omk/appeal/:id', () => HttpResponse.json({
    id: 10,
    isAppeal: 1,
    notes: 'Тестовая жалоба на состояние здоровья',
    objectiveExamination: 'Объективные данные осмотра',
    additionalLabData: 'Дополнительные лабораторные данные',
    conclusionRecommendations: 'Заключение и рекомендации',
    incomingLetterNo: 'ВХ-2024-010',
    dateReceipt: '2024-06-01',
    committeeComment: 'Комментарий комитета из фикстуры',
    selectedFileName: 'appeal-010.pdf',
    fileId: 777,
    status: { id: 15000, nameRu: 'Завершено', nameKz: 'Аяқталды' },
    reExaminationAppealTypes: [
      { appealType: 1 },
      { appealType: 2 }
    ]
  })),
  http.get('*/api/omk/expert-opinion/:patientId', () => HttpResponse.json({
    id: 1,
    disabilityGroup: { id: 766, nameRu: 'I группа', nameKz: 'I топ' },
    deadline: { id: 1077, nameRu: 'Бессрочно', nameKz: 'Мерзімсіз' },
    termReceived: '2024-01-10',
    reasonDisabilityAccordForm7: 'Заболевание',
    reasonforDisability: 'Вследствие заболевания',
    informDisability: 'Да',
    uotDegree: 85,
    deadline2: { id: 820, nameRu: '6 месяцев', nameKz: '6 ай' },
    termUotReceived: '2024-06-01',
    uptData: [
      {
        degreeUpt: 30,
        deadline2: { id: 821, nameRu: '1 год', nameKz: '1 жыл' },
        termUptDate: '2024-05-01'
      }
    ]
  })),

  http.get('*/dictionary/value/all/131', () => HttpResponse.json([
    { id: 1, nameRu: 'Головная боль', nameKz: 'Бас ауруы' },
    { id: 2, nameRu: 'Нарушение сна', nameKz: 'Ұйқы бұзылуы' }
  ])),



  http.get('*/dictionary/value/region', () => HttpResponse.json([
    { id: 1, nameRu: 'г. Астана', nameKz: 'Астана қ.' },
    { id: 2, nameRu: 'г. Алматы', nameKz: 'Алматы қ.' }
  ])),

  http.get('*/api/examination/ipr/:id', ({ params }) => {
    const expertOpinionId = Number(params['id']);
    return HttpResponse.json({
      id: 1,
      expertOpinionId: expertOpinionId,
      profIpr: [
        {
          id: 1,
          helpId: { id: 101, nameRu: 'Профессиональная ориентация', periodCnt: 1 },
          checked: true,
          showBlock: true,
          iprDate: '2024-01-15',
          deadlineDate: '2024-06-15',
          recommended: 'По показаниям',
          typeId: 1,
          expertOpinionId: expertOpinionId,
          duration: null,
          fold: null
        },
        {
          id: 2,
          helpId: { id: 102, nameRu: 'Профессиональное обучение', periodCnt: 2 },
          checked: false,
          showBlock: false,
          iprDate: null,
          deadlineDate: null,
          recommended: null,
          typeId: null,
          expertOpinionId: null,
          duration: null,
          fold: null
        }
      ],
      medIpr: [
        {
          id: 10,
          helpId: { id: 201, nameRu: 'Реконструктивная хирургия' },
          checked: true,
          showBlock: true,
          iprDate: '2024-02-01',
          deadlineDate: '2024-05-01',
          recommended: 'Операция',
          typeId: 2,
          expertOpinionId: expertOpinionId,
          duration: '10 дней',
          fold: '1 раз'
        },
        {
          id: 11,
          helpId: { id: 202, nameRu: 'Физиотерапия' },
          checked: false,
          showBlock: true,
          iprDate: null,
          deadlineDate: null,
          recommended: null,
          typeId: null,
          expertOpinionId: null,
          duration: null,
          fold: null
        }
      ],
      socialIpr: [
        {
          id: 100,
          helpId: { id: 301, rname: 'Социально-бытовая адаптация', periodCnt: 1 },
          dtClose: '2024-12-31',
          expertOpinionId: expertOpinionId
        }
      ]
    });
  }),

  http.get('*/dictionary/value/all/:id', () => HttpResponse.json([
    { id: 1, nameRu: 'Тестовое значение 1', nameKz: 'Тестовое значение 1' },
    { id: 2, nameRu: 'Тестовое значение 2', nameKz: 'Тестовое значение 2' }
  ])),

  // Точечный возврат на реальную сеть, если понадобится:
  // http.get('/api/some-real-endpoint', () => passthrough()),
];
