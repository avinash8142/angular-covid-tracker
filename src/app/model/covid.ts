export interface Covid
{
    id: string;
    state: string;
    stateCode:string;
    confirmedCase: number;
    curedCase: number;
    death :number;
    confirmedCaseDiff: number;
    curedCaseDiff : number;
    deathDiff : number;
    caseDt: string;
    activeCase: number;
    activeCaseDiff: number;

}