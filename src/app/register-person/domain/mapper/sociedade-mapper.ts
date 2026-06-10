import { SocietyEntity } from '../entities/sociedade-entity.model';
import { formatDate, formatDateEuaToLong } from '@base-core/format-date';
import { Sociedade } from '@register/data/model/sociedade.model';
import { toNumberBigDecimal, toRemoveCurrency } from '@base-core/state/format-currency';

export function instanceSociedadeMapper() {
    return new SociedadeMapper();
}

export class SociedadeMapper {

    mapFrom(sociedades: SocietyEntity[]): Sociedade[] {
        return sociedades.map(obj => {
            return {
                id: obj.id,
                assinaturaConjunta: obj.assinaturaConjunta,
                capitalSocial: toNumberBigDecimal(obj.capitalSocial),
                cargo: obj.cargo,
                nome: obj.nome,
                quota: toNumberBigDecimal(obj.quota)
            }
        });
    }
}

export function unmaskMoney(value: string): number {
    return Number(value.replace('R$', '').replace(',', '.'));
}