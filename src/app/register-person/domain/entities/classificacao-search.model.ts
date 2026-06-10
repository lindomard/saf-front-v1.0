import { PageEntity } from './page-entity.model';

export interface ClassificacaoSearchByName {
    query: string;
    pageable?: PageEntity;
}

export interface ClassificacaoSearchById {
    query: string;
    pageable?: PageEntity;
}