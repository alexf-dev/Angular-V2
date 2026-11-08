import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-text-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, InputTextModule],
  templateUrl: './text-input-field.component.html',
  styleUrls: ['./text-input-field.component.scss']
})
export class TextInputFieldComponent {
  private static idCounter = 0;

  @Input() labelKey = '';
  @Input() label = '';

  @Input() value: any = '';
  @Output() valueChange = new EventEmitter<any>();

  @Input() control: AbstractControl | null = null;

  @Input() placeholderKey = 'MAIN.COMMON.ENTER_VALUE';
  @Input() placeholder = '';

  @Input() stacked = true;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() digitsOnly = false;
  @Input() maxLength: number | null = null;

  constructor(private translate: TranslateService) {}

  public inputId = 'text-input-field-' + ++TextInputFieldComponent.idCounter;

  public onValue(value: any): void {
    this.value = value;
    this.valueChange.emit(value);
  }

  public onKeydown(event: KeyboardEvent): void {
    if (this.digitsOnly && !/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  public getDisplayLabel(): string {
    return this.label || (this.labelKey ? this.labelKey : '');
  }

  public getDisplayPlaceholder(): string {
    if (this.placeholder) {
      return this.placeholder;
    }
    return this.placeholderKey ? this.translate.instant(this.placeholderKey) : '';
  }
}
