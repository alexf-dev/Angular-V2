import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-number-field',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, InputNumberModule],
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent {
  private static idCounter = 0;

  @Input() labelKey = '';

  @Input() value: any = null;
  @Output() valueChange = new EventEmitter<any>();

  @Input() min = 0;
  @Input() max = 99;
  @Input() step = 1;

  @Input() mode: 'decimal' | 'currency' = 'decimal';
  @Input() showButtons = false;
  @Input() buttonLayout: 'horizontal' | 'vertical' | 'stacked' = 'horizontal';

  @Input() disabled = false;
  @Input() required = false;
  @Input() placeholder = '';

  @Input() stacked = true;

  public inputId = 'number-field-' + ++NumberFieldComponent.idCounter;

  public onValue(value: any): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
