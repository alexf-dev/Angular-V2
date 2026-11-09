import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiProvider } from './api-provider.interface';
import { LegacyApiProvider } from './legacy-api.provider';
import { BffApiProvider } from './bff-api.provider';

/**
 * Фабрика провайдеров API.
 * Выбирает провайдер на основе флага useBff в environment.
 *
 * useBff = false → LegacyApiProvider (текущий режим)
 * useBff = true  → BffApiProvider (новый режим)
 */
@Injectable({ providedIn: 'root' })
export class ApiProviderFactory {
  constructor(
    private legacy: LegacyApiProvider,
    private bff: BffApiProvider
  ) {}

  getProvider(): ApiProvider {
    console.log(`[API] Using ${environment.useBff ? 'BFF' : 'Legacy'} provider`);
    return environment.useBff ? this.bff : this.legacy;
  }
}
