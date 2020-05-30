export interface CovidDataByDistrict {
    id: string;
    state?: any;
    name: string;
    confirmed: number;
    recovered?: any;
    deaths?: any;
    oldConfirmed: number;
    oldRecovered?: any;
    oldDeaths?: any;
    zone: string;
}