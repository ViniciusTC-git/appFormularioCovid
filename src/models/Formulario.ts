import{ BaseEntity } from './BaseEntity';

export class Formulario extends BaseEntity {
    tosse:boolean = false;
    febre:boolean = false;
    cansaco:boolean = false;
    dores:boolean = false;
    conjuntivite:boolean = false;
    dorDeGarganta:boolean = false;
    dorDeCabeca:boolean = false;
    dificuldadeRespiratoria:boolean = false;
    outro: string;
    idUsuario:string;
    data:Date;
}