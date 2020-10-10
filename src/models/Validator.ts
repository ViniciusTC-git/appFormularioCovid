export class Validator{
    nome: Array<ValidatorType> = [
        new ValidatorType('required','Nome é obrigatorio !'),
        new ValidatorType('pattern','Somente Caracteres !'),
        new ValidatorType('minlength','Nome deve ter no minimo 5 caracteres !'),
        new ValidatorType('maxlength','Nome deve ter no maximo 30 caracteres !')
    ];
    email: Array<ValidatorType> = [
        new ValidatorType('required','Email é obrigatorio !'),
        new ValidatorType('email','Insira um Email Valido !'),
    ];
    senha: Array<ValidatorType> = [
        new ValidatorType('required','Senha é obrigatorio !'),
    ];
    confirmSenha:Array<ValidatorType> = [
        new ValidatorType('required','Confirmação de Senha é obrigatorio !'),
    ];
    setor:Array<ValidatorType> = [
        new ValidatorType('required','Setor é obrigatorio !'),
    ];
}
class ValidatorType {
    type: 'required'|'pattern'|'minlength'|'maxlength'|'email';
    message:string;
    constructor(type:any,message:string){
        this.type = type;
        this.message = message;
    }
}