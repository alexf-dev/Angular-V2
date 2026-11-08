import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RadioButtonModule } from 'primeng/radiobutton';

export interface RadioOption {
  value: any;
  labelKey?: string;
  label?: string;
}

@Component({
  selector: 'app-radio-group-field',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RadioButtonModule],
  templateUrl: './radio-group-field.component.html',
  styleUrls: ['./radio-group-field.component.scss']
})
export class RadioGroupFieldComponent {
  private static idCounter = 0;

  @Input() labelKey = '';

  /**
   * Массив опций: [{value: 1, labelKey: 'OPTION_1'}, ...]
   */
  @Input() options: RadioOption[] = [];

  @Input() value: any = null;
  @Output() valueChange = new EventEmitter<any>();

  @Input() disabled = false;
  @Input() required = false;

  /**
   * Расположение радио-кнопок: horizontal (в ряд) или vertical (столбиком)
   */
  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Базовое имя для input-элементов (уникализирует группу)
   */
  public groupName = 'radio-group-' + ++RadioGroupFieldComponent.idCounter;

  public getRadioId(option: RadioOption): string {
    return `${this.groupName}-${option.value}`;
  }

  public onValueChange(option: RadioOption): void {
    this.value = option.value;
    this.valueChange.emit(this.value);
  }
}
