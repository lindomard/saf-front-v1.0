export interface Contato {
    id?: number;
    fone?: string;
    email?: string;
    finalidade?: string;
    nome?: string;
    categoria?: number;
    departamento?: string;
}


export interface ContatoClienteSave {
    idCliente: number;
    contatos: Contato[];
}