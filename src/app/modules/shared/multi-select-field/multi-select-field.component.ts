import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import { TranslateDictionaryPipe } from '../../../core/pipe/translateDictionary.pipe';

@Component({
  selector: 'app-multi-select-field',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, MultiSelectModule, ChipModule, TranslateDictionaryPipe],
  templateUrl: './multi-select-field.component.html',
  styleUrls: ['./multi-select-field.component.scss']
})
export class MultiSelectFieldComponent {
  private static idCounter = 0;

  @Input() labelKey = '';

  /**
   * Массив опций. Поддерживает разные форматы:
   * - [{labelKey: 'KEY', value: '1'}, ...] - стандартный
   * - [{id: 1, nameRu: 'Название'}, ...] - доменный
   */
  @Input() options: any[] = [];

  @Input() optionValue = 'id';
  @Input() optionLabel = 'nameRu';

  /**
   * Переводить ли optionLabel через TranslateService
   */
  @Input() translateOptions = false;

  @Input() value: any[] = [];
  @Output() valueChange = new EventEmitter<any[]>();

  @Input() placeholder = '';
  @Input() placeholderKey = 'COMMON.CHOOSE';

  @Input() disabled = false;
  @Input() required = false;
  @Input() dictionaryMode = false;

  /**
   * Показывать ли выбранные элементы как чипсы (p-chip)
   */
  @Input() showChips = true;

  /**
   * Показывать ли фильтр
   */
  @Input() filter = false;

  @Input() stacked = true;

  public multiSelectId = 'multi-select-field-' + ++MultiSelectFieldComponent.idCounter;

  /**
   * Кэш для маппинга value → полный объект опции
   * Используется для отображения чипсов
   */
  public getSelectedItems(): any[] {
    if (!this.value || !this.options) return [];
    return this.options.filter(opt => this.value.includes(opt[this.optionValue]));
  }

  public getOptionLabel(option: any): string {
    if (!option) return '';
    const label = option[this.optionLabel];
    return label || '';
  }

  public onValueChange(value: any[]): void {
    this.value = value || [];
    this.valueChange.emit(this.value);
  }

  public onRemoveItem(item: any): void {
    const valueToRemove = item[this.optionValue];
    this.value = this.value.filter(v => v !== valueToRemove);
    this.valueChange.emit(this.value);
  }
}
