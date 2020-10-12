
export abstract class BaseEntity {
    id: string = null;
    ativo: boolean = true;
    deletado: boolean = null;
    criado: Date =  new Date();
    atualizado: Date = null;
}