import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { FormsModule } from '@angular/forms';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import {TranslateModule} from "@ngx-translate/core";
import {TranslateDictionaryPipe} from "../../core/pipe/translateDictionary.pipe";
import {TableModule} from "primeng/table";
import {IinRequestEmptyComponent} from "./iin-request-empty/iin-request-empty.component";
import {ButtonModule} from "primeng/button";
import {TagModule} from "primeng/tag";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {TooltipModule} from "primeng/tooltip";
import {PaginatorModule} from "primeng/paginator";
import {DialogModule} from "primeng/dialog";
import {OmkModule} from "../omk/omk.module";
import {ConcatSubItemsNamePipe} from "../../core/pipe/concat-sub-items-name.pipe";
import { TextInputFieldComponent } from '@shared/text-input-field/text-input-field.component';
import { DropdownFieldComponent } from '@shared/dropdown-field/dropdown-field.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { DataTableComponent } from '@shared/data-table/data-table.component';


@NgModule({
  declarations: [PatientsListComponent, PatientHistoryComponent, IinRequestEmptyComponent],
  exports: [
    PatientsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PatientsRoutingModule,
    TranslateModule,
    TranslateDictionaryPipe,
    TableModule,
    ButtonModule,
    TagModule,
    CardModule,
    InputTextModule,
    CheckboxModule,
    TooltipModule,
    PaginatorModule,
    DialogModule,
    OmkModule,
    ConcatSubItemsNamePipe,
    TextInputFieldComponent,
    DropdownFieldComponent,
    CheckFieldComponent,
    DataTableComponent
  ]
})
export class PatientsModule { }
