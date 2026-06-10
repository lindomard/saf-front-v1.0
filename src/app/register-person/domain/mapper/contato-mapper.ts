import { Contato, ContatoClienteSave } from '@register/data/model/contato.model';
import { ContatoEntity } from '../entities/contacts-entity.model';

export function instanceContatoMapper() {
    return new ContatoMapper();
}

export class ContatoMapper {

    mapFrom(contatos: ContatoEntity[]): Contato[] {
        const list  = this.converter(contatos);
        return list;
    }

    private converter(contatoEntity: ContatoEntity[]) {
        return contatoEntity.map(contato => {
            return {
                id: contato.id,
                nome: contato.nome,
                finalidade: contato.finalidade,
                categoria: contato.idCategoria,
                departamento: contato.departamento,
                email: contato.email,
                fone: contato.telefone
            }
        });
    } 
}