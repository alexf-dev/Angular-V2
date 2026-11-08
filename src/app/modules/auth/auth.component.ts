import {Component, OnDestroy, OnInit} from "@angular/core";
import {LangChangeEvent} from "@ngx-translate/core";
import {TranslationService} from "../../core/service/translation.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{

    routeItems;
    languageChangeSubscription;

    constructor(private translation: TranslationService) {}


    ngOnInit(): void {
        this.languageChangeSubscription = this.translation.langChange$.subscribe(
            (event) => {
                this.loadTranslation();
            }
        )
        this.loadTranslation()
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    loadTranslation() {
        this.translation.getTranslations(['MAIN.AUTH.TAB_LOGIN', 'MAIN.AUTH.TAB_CHANGE_PWD'])
            .subscribe(translations => {
                this.routeItems = [
                    { icon: "pi pi-user", label: translations['MAIN.AUTH.TAB_LOGIN'], routerLink: 'login' },
                    { icon: "pi pi-key", label: translations['MAIN.AUTH.TAB_CHANGE_PWD'], routerLink: 'changepass' }
                ];
            });
    }

}
