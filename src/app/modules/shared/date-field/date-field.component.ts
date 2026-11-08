import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-field',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, CalendarModule, ReactiveFormsModule],
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss']
})
export class DateFieldComponent {
  private static idCounter = 0;

  @Input() labelKey = '';

  @Input() value: any = null;
  @Output() valueChange = new EventEmitter<any>();
  @Input() control: AbstractControl | null = null;

  @Input() dateFormat = 'dd.mm.yy';
  @Input() showIcon = true;
  @Input() showTime = false;
  @Input() hourFormat = '24';

  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;

  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;

  @Input() stacked = true;
  @Input() readonlyInput = false;

  public calendarId = 'date-field-' + ++DateFieldComponent.idCounter;

  public onValue(value: any): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
