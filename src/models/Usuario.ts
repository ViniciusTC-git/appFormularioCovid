import{ BaseEntity } from './BaseEntity';
import { Formulario } from './Formulario';

export class Usuario extends BaseEntity {
    nome: string = null;
    setor:string = null;
    email: string = null;
    senha: string = null;
    formularios: Array<Formulario> = new Array();
    constructor(formulario:any){
        super();
        if(formulario){
            this.ativo = true;
            this.criado = new Date();
            Object.entries(formulario).forEach(([key,value])=>{
                if(this.hasOwnProperty(key)){
                    this[key] = value;
                }
            });
        }
    }
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