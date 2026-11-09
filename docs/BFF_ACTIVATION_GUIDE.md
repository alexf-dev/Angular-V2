# Руководство по активации BFF

## Текущий статус

- **useBff = false** (по умолчанию)
- Приложение работает через `LegacyApiProvider`
- `LegacyApiProvider` делегирует вызовы существующим сервисам:
  - `CamundaService` — основная логика экспертизы
  - `DictionaryService` — справочники
  - `PersonService` — данные персон
  - `ImageContentService` — изображения
  - Прямые вызовы через `ApiService`
- Работа CBDI **НЕ нарушена**

## Когда включать BFF

Включайте BFF только когда:
1. ✅ Бэкенд BFF полностью готов и задеплоен
2. ✅ Все BFF endpoints протестированы
3. ✅ Контракты согласованы между frontend и backend
4. ✅ Проведено интеграционное тестирование (при необходимости)

## Как включить BFF

### Шаг 1: Обновите environment файлы

**src/environments/environment.ts:**
```typescript
export const environment = {
  production: false,
  useMocks: false,
  useBff: true,  // ← ИЗМЕНИТЬ НА true
  apiUrl: 'https://test-cbdi-gateway.enbek.kz',
  bffUrl: 'https://test-cbdi-bff.enbek.kz'  // ← Укажите реальный URL BFF
};
