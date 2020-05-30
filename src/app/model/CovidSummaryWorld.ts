import { GlobalSummary } from './GlobalSummary';
import { CountryWiseInfo } from './CountryWiseInfo';

export interface CovidSummaryWorld{
    Global : GlobalSummary;
    Countries : CountryWiseInfo[];     
}