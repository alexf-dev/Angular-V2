import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbsenteeExaminationRoutingModule} from "./absentee-examination-routing.module";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {TranslateModule} from "@ngx-translate/core";
import {DialogModule} from "primeng/dialog";
import {WaitingListComponent} from "./waiting-list/waiting-list.component";
import {MseActRegisterJournalComponent} from "./mse-act-register-journal/mse-act-register-journal.component";
import {PanelModule} from "primeng/panel";
import { DropdownFieldComponent } from '@shared/dropdown-field/dropdown-field.component';
import { DateFieldComponent } from '@shared/date-field/date-field.component';

@NgModule({
  declarations: [WaitingListComponent, MseActRegisterJournalComponent],
    imports: [
        CommonModule,
        FormsModule,
        AbsenteeExaminationRoutingModule,
        ButtonModule,
        TableModule,
        DropdownModule,
        CalendarModule,
        TranslateModule,
        DialogModule,
        DropdownFieldComponent,
        DateFieldComponent,
        PanelModule
    ]
})
export class AbsenteeExaminationModule { }
