import { FormControl, FormGroup } from "@angular/forms";

export class Validator{
    nome: Array<ValidatorType> = [
        new ValidatorType('required','Nome é obrigatorio !'),
        new ValidatorType('pattern','Somente Caracteres !'),
        new ValidatorType('minlength','Nome deve ter no minimo 5 caracteres !'),
        new ValidatorType('maxlength','Nome deve ter no maximo 30 caracteres !')
    ];
    email: Array<ValidatorType> = [
        new ValidatorType('required','Email é obrigatorio !'),
        new ValidatorType('pattern','Insira um Email Valido !'),
    ];
    senha: Array<ValidatorType> = [
        new ValidatorType('required','Senha é obrigatorio !'),
        new ValidatorType('pattern','A senha deve conter, 1 carácter de cada (minusculo, maisculo, numerico,[!@#$%^&*] e ser maior ou igual a 6 caracteres !'),
    ];
    confirmSenha:Array<ValidatorType> = [
        new ValidatorType('required','Confirmação de Senha é obrigatorio !'),
    ];
    setor:Array<ValidatorType> = [
        new ValidatorType('required','Setor é obrigatorio !'),
    ];
    outro:Array<ValidatorType> = [
        new ValidatorType('pattern','Somente Caracteres !'),
    ];
    getErrorMessage = (action:string,form:FormGroup) => {
        return this[action].map((element) => {
            return form.get(action).hasError(element.type) ? element.message : undefined;
        }).filter((erro)=>{
          return erro;
        }).join();
    }
}
class ValidatorType {
    type: 'required'|'pattern'|'minlength'|'maxlength'|'email';
    message:string;
    constructor(type:any,message:string){
        this.type = type;
        this.message = message;
    }
}