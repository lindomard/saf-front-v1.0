import { Mapper } from 'src/app/base/base-core/map/mapper';
import { UserEntity } from '../../domain/entity/user-entity';
import { User } from '../model/user';

export class UserMapper {

    mapFrom(param: UserEntity): User {
        return {
            username : param.username,
            password : param.password,
            grant_type : 'password'
        }
    }    
    
    // mopTo(param: User): UserEntity {
    //     return {

    //     }
    // }

}
