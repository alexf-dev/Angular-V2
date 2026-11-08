import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-check-field',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, CheckboxModule, ReactiveFormsModule],
  templateUrl: './check-field.component.html',
  styleUrls: ['./check-field.component.scss']
})
export class CheckFieldComponent {
  private static idCounter = 0;

  @Input() labelKey = '';
  @Input() label = '';  // Прямой текст лейбла

  @Input() showComment = false;
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();
  @Input() control: AbstractControl | null = null;

  @Input() comment = '';
  @Output() commentChange = new EventEmitter<string>();

  @Input() disabled = false;

  public inputId = 'check-field-' + ++CheckFieldComponent.idCounter;

  public onChecked(value: boolean): void {
    this.checked = value;
    this.checkedChange.emit(value);
  }

  public onComment(value: string): void {
    this.comment = value;
    this.commentChange.emit(value);
  }
}
