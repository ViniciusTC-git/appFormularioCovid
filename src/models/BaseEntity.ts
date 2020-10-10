import { BaseNotification } from "./BaseNotification";

export abstract class BaseEntity {
    id: string;
    ativo: boolean;
    deletado: boolean;
    criado: Date;
    atualizado: Date;
}