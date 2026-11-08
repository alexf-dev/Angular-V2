import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TranslateService } from '@ngx-translate/core';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea-field',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, InputTextareaModule, ReactiveFormsModule],
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent {
  private static idCounter = 0;

  @Input() labelKey = '';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() rows = 2;
  @Input() placeholderKey = 'MAIN.COMMON.ENTER_VALUE';
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() required = false;
  @Input() control: AbstractControl | null = null;

  /**
   * По макету textarea ВСЕГДА на всю ширину, label сверху.
   * Дефолт true; если где-то понадобится компактный вариант — передать [stacked]="false".
   */
  @Input() stacked = true;

  public inputId = 'textarea-field-' + ++TextareaFieldComponent.idCounter;

  constructor(private translate: TranslateService) {}

  public onValue(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }

  public getDisplayPlaceholder(): string {
    if (this.placeholder) {
      return this.placeholder;
    }
    return this.placeholderKey ? this.translate.instant(this.placeholderKey) : '';
  }
}
