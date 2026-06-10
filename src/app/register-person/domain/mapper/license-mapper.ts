import { formatDateEuaToLong } from '@base-core/format-date';
import { TYPE_SANITARY } from '@register/component/register-person/general-person/licencas/licenses-form';
import { LicensesModel } from '@register/data/model/license.model';
import { LicensesEntity } from '../entities/licenses-entity.model';


export function instanceLicenseMapper() {
    return new LicenseMapper();
}

export class LicenseMapper {

    mapFrom(alvara: LicensesEntity[]): LicensesModel[] {
        return alvara.map(obj => {
            return  {
                id: obj.id,
                dueDate:  formatDateEuaToLong(obj.dueDate),
                number: obj.number,
                type: obj.type == TYPE_SANITARY ? 0 : 1,
                dispatcher: obj.dispatcher
            }
        });
    }
}