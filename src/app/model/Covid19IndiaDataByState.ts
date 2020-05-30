import { CovidDataByDistrict } from './Covid19IndiaDataByDistrict';

    export interface Covid19IndiaDataByState {
        id: string;
        state: string;
        active: number;
        confirmed: number;
        recovered: number;
        deaths: number;
        aChanges: number;
        cChanges: number;
        rChanges: number;
        dChanges: number;
        districtData: CovidDataByDistrict[];
    }

