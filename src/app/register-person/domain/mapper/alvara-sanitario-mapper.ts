import { AlvaraSanitario } from '@register/data/model/alvara-sanitario.model';
import { AlvaraSanitarioEnity } from '../entities/alvara-sanitario-entity.model';
import { formatDateEuaToLong } from '@base-core/format-date';

export function instanceAlvaraSanitarioMapper() {
    return new AlvaraSanitarioMapper();
}

export class AlvaraSanitarioMapper {
    
    mapFrom(alvara: AlvaraSanitarioEnity[]): AlvaraSanitario[] {
        return alvara.map(obj => {
            return  {
                id: obj.id,
                data:  formatDateEuaToLong(obj.data),
                numero: obj.numero,
                tipo: obj.tipo,
                dispatcher: obj.dispacher
            }
        });
    }
}