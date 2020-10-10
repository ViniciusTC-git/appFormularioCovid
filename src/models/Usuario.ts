import{ BaseEntity } from './BaseEntity';
import { Formulario } from './Formulario';

export class Usuario extends BaseEntity {
    nome: string = null;
    setor:string = null;
    email: string = null;
    senha: string = null;
    formularios: Formulario[] = [];
}
export class Setor{
    nomes: Array<string> = [
        'TI',
        'Logistica',
        'Financeiro',
        'RH',
        'Expedicao',
        'Comercial',
        'Marketing',
        'Produto',
        'Limpeza'
    ]
}