import{ BaseEntity } from './BaseEntity';
import { Formulario } from './Formulario';

export class Usuario extends BaseEntity {
    nome: string = null;
    setor:string = null;
    email: string = null;
    senha: string = null;
<<<<<<< HEAD
    formularios: Array<Formulario>;
=======
    formularios: Array<Formulario> = new Array();
>>>>>>> fb6230853c07904e51e06a4c0a27b743af625cbc
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