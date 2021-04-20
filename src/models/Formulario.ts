import{ BaseEntity } from './BaseEntity';

export class Formulario extends BaseEntity {
    tosse: boolean = false;
    febre: boolean = false;
    cansaco: boolean = false;
    dores: boolean = false;
    conjuntivite: boolean = false;
    dorDeGarganta: boolean = false;
    dorDeCabeca: boolean = false;
    dificuldadeRespiratoria: boolean = false;
    outro: string = null;
    idUsuario: string = null;
    data: Date = new Date();

    constructor(formulario:any){
        super();
        if(formulario){
            this.criado = new Date();
            Object.entries(formulario).forEach(([key,value])=>{
                if(this.hasOwnProperty(key)){
                    this[key] = value;
                }
            });
        }

    }
}

export class Sintoma {
    tipo: 'febre'| 'tosse'|'cansaco'|'dores'|'dorDeGarganta'|'conjuntivite'|'dorDeCabeca'|'dificuldadeRespiratoria'
    descricao:string;
    constructor(tipo:any){
        if(SintomaDescricao[tipo.toUpperCase()]){
            this.tipo = tipo;
            this.descricao = SintomaDescricao[tipo.toUpperCase()];
        }
    }
}
enum SintomaDescricao{
    FEBRE = 'Febre' ,
    TOSSE = 'Tosse' ,
    CANSACO = 'Cansaço',
    DORES = 'Dores' ,
    DORDEGARGANTA =  'Dor de Garganta' ,
    CONJUNTIVITE = 'Conjuntivite' ,
    DORDECABECA = 'Dor de Cabeça' ,
    DIFICULDADERESPIRATORIA = 'Dificuldade Respiratoria'
}