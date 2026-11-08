import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-file-upload-field',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './file-upload-field.component.html',
  styleUrls: ['./file-upload-field.component.scss']
})
export class FileUploadFieldComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Input() labelKey = '';

  /**
   * Допустимые типы файлов (например: '.pdf, application/pdf')
   */
  @Input() accept = '.pdf';

  /**
   * Максимальный размер файла в байтах (по умолчанию 10MB)
   */
  @Input() maxSize = 10 * 1024 * 1024;

  @Input() disabled = false;
  @Input() required = false;

  /**
   * Имя выбранного файла (для отображения)
   */
  @Input() fileName: string | null = null;

  @Output() fileSelect = new EventEmitter<File>();
  @Output() fileRemove = new EventEmitter<void>();

  @Input() stacked = true;

  public onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (this.maxSize && file.size > this.maxSize) {
      const maxSizeMB = Math.round(this.maxSize / (1024 * 1024));
      alert(`Файл слишком большой. Максимальный размер: ${maxSizeMB}MB`);
      input.value = '';
      return;
    }

    this.fileName = file.name;
    this.fileSelect.emit(file);
  }

  public openFileDialog(event: Event, input: HTMLInputElement): void {
    event.stopPropagation();
    if (!this.disabled) {
      input.click();
    }
  }

  public removeFile(input: HTMLInputElement): void {
    input.value = '';
    this.fileName = null;
    this.fileRemove.emit();
  }
}
