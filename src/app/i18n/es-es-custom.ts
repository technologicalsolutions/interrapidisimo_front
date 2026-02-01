import { es_ES } from "ng-zorro-antd/i18n";

export const es_ES_custom = {
    ...es_ES,
    DatePicker: {
        ...es_ES.DatePicker,
        lang: {
            ...es_ES.DatePicker?.lang,
            rangePlaceholder: ['Fecha inicio', 'Fecha fin'],
            rangeWeekPlaceholder: ['Semana inicio', 'Semana fin'],
            rangeMonthPlaceholder: ['Mes inicio', 'Mes fin'],
            rangeQuarterPlaceholder: ['Trimestre inicio', 'Trimestre fin'],
            rangeYearPlaceholder: ['Año inicio', 'Año fin']
        },
        timePickerLocale:{
            ...es_ES.DatePicker?.timePickerLocale
        }
    }
}