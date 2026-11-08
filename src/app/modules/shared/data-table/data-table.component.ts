import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

export interface TableColumn {
  field: string;
  headerKey?: string;   // ключ перевода (опционально)
  header?: string;      // прямой текст (опционально)
  width?: string;
  align?: 'left' | 'center' | 'right';
  template?: TemplateRef<any>;
  fallbackField?: string;
}

export interface TableAction {
  id: string;
  icon: string;
  tooltipKey?: string;  // ключ перевода (опционально)
  tooltip?: string;     // прямой текст (опционально)
  severity?: 'success' | 'info' | 'warning' | 'danger' | 'secondary';
  style?: 'text' | 'outlined' | 'default';
  available?: (row: any) => boolean;
}

export interface PageChangeEvent {
  page: number;
  pageSize: number;
  first: number;
}

export interface ActionClickEvent {
  actionId: string;
  row: any;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    TooltipModule,
    TagModule
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() pageSize = 10;
  @Input() totalRecords = 0;
  @Input() currentPage = 1;

  @Input() totalLabelKey = 'COMMON.TOTAL_RECORDS';
  @Input() totalLabel = '';

  @Input() showActions = false;
  @Input() actions: TableAction[] = [];
  @Input() actionsColumnWidth = '150px';
  @Input() actionsHeaderKey = 'COMMON.ACTIONS';
  @Input() actionsHeader = '';
  @Input() actionsAlign: 'left' | 'center' | 'right' = 'center';

  @Input() emptyMessageKey = 'COMMON.NO_DATA';
  @Input() emptyMessage = '';

  @Output() pageChange = new EventEmitter<PageChangeEvent>();
  @Output() actionClick = new EventEmitter<ActionClickEvent>();
  @Output() rowClick = new EventEmitter<any>();

  @Input() showPaginator = true;
  @Input() rowsPerPageOptions: number[] = [];
  @Input() currentPageReportTemplate = 'Страница {currentPage} из {totalPages}';
  @Input() showEmptyIcon = false;

  public getCellValue(row: any, field: string): any {
    if (!row || !field) return null;

    const parts = field.split('.');
    let value = row;

    for (const part of parts) {
      if (value == null) return null;
      value = value[part];
    }

    return value;
  }

  public getAlignClass(align?: string): string {
    if (!align) return '';
    return `text-${align}`;
  }

  public isActionAvailable(action: TableAction, row: any): boolean {
    if (!action.available) return true;
    return action.available(row);
  }

  public onPageChange(event: any): void {
    const page = Math.floor(event.first / event.rows) + 1;
    this.currentPage = page;
    this.pageSize = event.rows;

    this.pageChange.emit({
      page: this.currentPage,
      pageSize: this.pageSize,
      first: event.first
    });
  }

  public onActionClick(action: TableAction, row: any): void {
    this.actionClick.emit({
      actionId: action.id,
      row: row
    });
  }

  public onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  public getFirst(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  public getColumnHeader(col: TableColumn): string {
    return col.header || (col.headerKey ? col.headerKey : '');
  }

  public getActionsHeader(): string {
    return this.actionsHeader || (this.actionsHeaderKey ? this.actionsHeaderKey : '');
  }

  public getEmptyMessage(): string {
    return this.emptyMessage || (this.emptyMessageKey ? this.emptyMessageKey : '');
  }

  public getActionTooltip(action: TableAction): string {
    return action.tooltip || (action.tooltipKey ? action.tooltipKey : '');
  }

  public getDisplayValue(row: any, col: TableColumn): any {
    const value = this.getCellValue(row, col.field);
    if (value !== null && value !== undefined && value !== '') {
      return value;
    }
    if (col.fallbackField) {
      const fallback = this.getCellValue(row, col.fallbackField);
      if (fallback !== null && fallback !== undefined && fallback !== '') {
        return fallback;
      }
    }
    return '—';
  }
}
