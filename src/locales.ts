import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as currencyData from 'cldr-data/supplemental/currencyData.json';

// ITALIAN
import { it } from '@syncfusion/ej2-locale/src/it.json';
import * as caGregorian from 'cldr-data/main/it/ca-gregorian.json';
import * as numbers from 'cldr-data/main/it/numbers.json';
import * as timeZoneNames from 'cldr-data/main/it/timeZoneNames.json';
import * as currencies from 'cldr-data/main/it/currencies.json';

export default {
    numberingSystems,
    currencyData
};

export const IT = {
    locale: it,
    caGregorian,
    numbers,
    timeZoneNames,
    currencies,
}