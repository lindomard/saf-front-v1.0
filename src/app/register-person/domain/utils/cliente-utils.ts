import { Page } from '@base-core/model/page.model';
import { ClienteAll } from '../entities/cliente-entity.model';

export function initEmptyClienteAll(): Page<ClienteAll> {
    return {
        content: [],
        totalElements: 0,
        pageable: {
            pageNumber: 0,
            pageSize: 0,
          
        },
        size: 0,
        totalPages: 0
    }
}