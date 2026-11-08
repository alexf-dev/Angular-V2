import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@environments/environment';

if (environment.production) {
  enableProdMode();
}

async function bootstrap(): Promise<void> {
  // MSW включается ТОЛЬКО если useMocks: true (в environment.mock.ts)
  // На тесте/проде useMocks: false → этот блок пропускается полностью
  if (environment.useMocks) {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  // Твоя существующая логика — БЕЗ ИЗМЕНЕНИЙ
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

bootstrap();
