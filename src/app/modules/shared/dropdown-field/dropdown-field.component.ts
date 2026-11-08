import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateDictionaryPipe } from '../../../core/pipe/translateDictionary.pipe';
import { TranslateService } from '@ngx-translate/core';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface DropdownOption {
  labelKey: string;
  value: string;
}

@Component({
  selector: 'app-dropdown-field',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, DropdownModule, TranslateDictionaryPipe, ReactiveFormsModule],
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss']
})
export class DropdownFieldComponent {
  private static idCounter = 0;

  @Input() labelKey = '';
  @Input() label = '';  // Прямой текст лейбла

  @Input() optionKeys: DropdownOption[] = [];
  @Input() options: any[] = [];
  @Input() optionValue = 'value';
  @Input() optionLabel = 'labelKey';
  @Input() translateOptions = false;

  @Input() value: any = null;
  @Output() valueChange = new EventEmitter<any>();

  @Input() placeholder = '';  // Прямой текст placeholder
  @Input() placeholderKey = 'COMMON.CHOOSE';

  @Input() disabled = false;
  @Input() showClear = true;
  @Input() required = false;
  @Input() stacked = true;
  @Input() fullWidth = true;   // false = ширина по содержимому (как узкий «Регион» в оригинале)

  @Input() dictionaryMode = false;
  @Input() styleClass = '';
  @Input() panelStyleClass = '';

  @Input() control: AbstractControl | null = null;

  public dropdownId = 'dropdown-field-' + ++DropdownFieldComponent.idCounter;

  constructor(private translate: TranslateService) {}

  public onValue(value: any): void {
    this.value = value;
    this.valueChange.emit(value);
  }

  public getOptions(): any[] {
    if (this.options && this.options.length > 0) {
      return this.options;
    }
    return this.optionKeys;
  }

  public shouldTranslateOptions(): boolean {
    if (this.options && this.options.length > 0) {
      return this.translateOptions;
    }
    return true;
  }

  public getOptionLabel(option: any): string {
    if (!option) return '';
    const label = option[this.optionLabel];
    return label || '';
  }

  public getDisplayPlaceholder(): string {
    if (this.placeholder) {
      return this.placeholder;
    }
    return this.placeholderKey ? this.translate.instant(this.placeholderKey) : '';
  }
}
