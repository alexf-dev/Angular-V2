import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from "../../../core/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PersonFilter } from "../../../dto/elastic/person-filter";
import { Patient } from "../../../dto/elastic/Patient";
import { DictinoryValue } from "../../../dto/dictinory-value";
import { finalize } from "rxjs";
import {
  TableColumn,
  TableAction,
  PageChangeEvent,
  ActionClickEvent
} from '../../shared/data-table/data-table.component';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit, AfterViewInit {
  isFromOmk: boolean = false;
  allPatients: Patient[] = [];
  patients: any[] = [];
  visiblePatients: any[] = [];
  page = 1;
  pageSize = 10;
  totalRecords = 0;
  regions: DictinoryValue[] = [];

  personFilter: any = {
    firstname: '',
    surname: '',
    iin: '',
    regionId: null,
    expired: false,
    dead: false,
    survived: false
  };

  currentIin: string | null = null;
  private iinDelayHandle: any;
  loading = false;

  @ViewChild('statusTemplate', { static: true }) statusTemplate: any;

  columns: TableColumn[] = [
    { field: 'fullName', header: 'ФИО', width: '220px' },
    { field: 'iin', header: 'ИИН', width: '140px' },
    { field: 'region.nameRu', header: 'Регион', width: '180px', fallbackField: 'region.id' },
    { field: 'birthDate', header: 'Дата рождения', width: '140px' },
    { field: 'personStatus', header: 'Статус', width: '140px' }
  ];

  actions: TableAction[] = [
    {
      id: 'view',
      icon: 'pi pi-eye',
      tooltip: 'Подробнее',
      severity: 'secondary',
      style: 'text'
    }
  ];

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const source = params.get('source');
      this.isFromOmk = source === 'omk';
    });
  }

  ngAfterViewInit() {
    this.columns[4].template = this.statusTemplate;
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize) || 1;
  }

  onIinRequest(iin: string): void {
    this.currentIin = iin;
    this.personFilter = { ...this.personFilter, iin };
    if (this.iinDelayHandle) {
      clearTimeout(this.iinDelayHandle);
    }
    this.iinDelayHandle = setTimeout(() => this.filter(this.personFilter), 3000);
  }

  filter(patientFilter: PersonFilter): void {
    this.loading = true;
    this.api.post<Patient[]>('/api/person/search', patientFilter)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.allPatients = response || [];
          this.totalRecords = this.allPatients.length;
          this.page = 1;
          this.updatePage();
        },
        error: (err) => {
          this.allPatients = [];
          this.patients = [];
          this.visiblePatients = [];
          this.totalRecords = 0;
          alert('Ошибка сервера: ' + (err.message || err));
        }
      });
  }

  updatePage(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.patients = this.allPatients.slice(start, end).map(p => ({
      ...p,
      fullName: `${p.surname || ''} ${p.firstName || ''} ${p.secondName || ''}`.trim()
    }));
    this.visiblePatients = this.patients.filter(p => !!p.iin);
  }

  onPageChange(event: PageChangeEvent): void {
    this.pageSize = event.pageSize;
    this.page = event.page;
    this.updatePage();
  }

  onActionClick(event: ActionClickEvent): void {
    if (event.actionId === 'view') {
      this.openHistory(event.row);
    }
  }

  resetFilter(): void {
    this.personFilter = {
      firstname: '',
      surname: '',
      iin: '',
      regionId: null,
      expired: false,
      dead: false,
      survived: false
    };
    this.currentIin = null;
    this.page = 1;
    this.allPatients = [];
    this.patients = [];
    this.visiblePatients = [];
    this.totalRecords = 0;
    if (this.iinDelayHandle) {
      clearTimeout(this.iinDelayHandle);
    }
  }

  getByIdFromLocalStorage(id: number, key: string): DictinoryValue {
    const data = localStorage.getItem(key);
    const dic: DictinoryValue = { id: 1 } as DictinoryValue;
    if (!data) return dic;
    const arr = JSON.parse(data);
    return arr.find((item: any) => item.id === id);
  }

  loadDic(patient: any): any {
    return this.api.getByIdFromLocalStorage<DictinoryValue>(patient.personStatusId, 'dic_status');
  }

  openHistory(patient: Patient): void {
    this.router.navigate(
      ['/main/patients/history', patient.iin],
      this.isFromOmk ? { queryParams: { source: 'omk' } } : {}
    );
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'danger' {
    if (status === 'Умерший') {
      return 'danger';
    }
    if (status === 'Нормальный') {
      return 'success';
    }
    return 'info';
  }
}
