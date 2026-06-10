import { SocialNetwork } from '@register/data/model/person-response.model';
import { SocialNetworkEntity } from '../entities/social-netwoek-entity.model';

export function instanceRedeSociaisMapper() {
    return new RedeSociaisMapper();
}

export class RedeSociaisMapper {

    mapFrom(socialNetwork: SocialNetworkEntity[]): SocialNetwork[] {
        return this.converter(socialNetwork);
    }

    private converter(socialNetwork: SocialNetworkEntity[]) {
        return socialNetwork.map(rede => {
            return {
                id: rede.id,
                tipo: rede.tipo,
                nome: rede.nome
            }
        });
    }
}