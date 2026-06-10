import { Mapper } from 'src/app/base/base-core/map/mapper';
import { UserEntity } from '../entity/user-entity';

export function instanceSignInMapper() {
    return new SignInMapper();
}

export class SignInMapper {
    
    mapFrom(param: UserEntity): String {
        return `username=${param.username}&password=${param.password}&grant_type=password&company_id=${param.company}`;
    }
}