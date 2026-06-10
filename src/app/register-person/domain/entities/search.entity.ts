export enum ItemSearch {
    Code = '1',
    CompanyName = '2',
    FantansyName = '3',
    CNPJ = '4',
    Type = '5',
    City = '6'
}

export enum SituationClient {
    All = 0,
    Active = 1,
    Inative = 2,
    Pending = 3,
    BlackList = 4
}

export function getTypeFilter(id: string): string {
    let type: string = '';
    switch(id) {
        case '1': {
            type = 'CODE';
            break;
        }
        case '2': {
            type = 'COMPANY_NAME';
            break;
        }
        case '3': {
            type = 'FANTASY_NAME';
            break;
        }
        case '4': {
            type = 'CNPJ';
            break;
        }
        case '5': {
            type = 'TYPE';
            break;
        }
        case '6': {
            type = 'CITY';
            break;
        }
    }
    return type;
}