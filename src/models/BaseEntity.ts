
export abstract class BaseEntity {
    id: string = null;
    ativo: boolean = true;
    deletado: boolean = false;
    criado: Date =  new Date();
    atualizado: Date = null;
}