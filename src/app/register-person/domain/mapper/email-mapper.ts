import { Mapper } from 'src/app/base/base-core/map/mapper';
import { EmailEntity } from '../entities/email-entity.model';
import { Email } from '../../data/model/email.model';

export class EmailMapper implements Mapper<EmailEntity, Email> {
    
    mapFrom(param: EmailEntity): Email {
        return {
            contato: param.contato,
            email: param.email,
            emailNfe: param.emailNfe,
            site: param.site
        }
    }    
    
    mopTo(param: Email): EmailEntity {
        return {
            contato: param.contato,
            email: param.email,
            emailNfe: param.emailNfe,
            site: param.site
        }
    }


}