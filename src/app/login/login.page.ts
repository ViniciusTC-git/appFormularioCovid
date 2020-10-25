import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Usuario, Setor} from '../../models/Usuario'
import {LoginService} from '../../services/login.service'
import {UsuarioService} from '../../services/usuario.service'
import { AuthService } from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AlertService } from '../../services/alert.service';
import { Validator } from '../../models/Validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLoginForm: FormGroup;
  userCadastroForm: FormGroup;
  hideCardLogin:boolean = false;
  hideCardCadastro:boolean = true;
  hidePassword:boolean  = true;
  hidePasswordConfirm:boolean = true;
  validationMessage:Validator;
  setores:Setor;
  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private form: FormBuilder,
    private alert: AlertService
    ) { 
    this.userLoginForm = this.form.group({
      email: ['',Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      senha: ['',Validators.required]
    })
    this.userCadastroForm = this.form.group({
      email: ['',Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      nome: ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.minLength(5),
        Validators.maxLength(30)
      ])],
      setor: ['',Validators.required],
      senha: ['',Validators.required],
      confirmSenha: ['',Validators.required],
    })
    this.validationMessage = new Validator();
    this.setores =  new Setor();
  }

  ngOnInit() {}
  loginForm(){
    if (!this.userLoginForm.valid) return;

    this.loginService.login(<Usuario>this.userLoginForm.value).then((res)=>{
        if(res.size > 0){
          this.authService.authLogin(res.docs[0].id);
        }else{
          this.alert.openSnackBar('Email ou Senha não conferem !', '', 'warning');
        }
    });
    
  }
  cadastroForm(){
    if (!this.userCadastroForm.valid){
      return false;
    }else if( this.userCadastroForm.get('confirmSenha').value !== this.userCadastroForm.get('senha').value){
      this.alert.openSnackBar('Senhas não conferem !', '', 'warning');
      return false;
    }else{
      const usuario = new Usuario(this.userCadastroForm.value);
<<<<<<< HEAD
      this.loginService.validateUsuario(usuario).then((values)=>{
        const isUsuario = (values[0].size > 0 || values[1].size > 0)
        if(!isUsuario){
          this.usuarioService.postUsuario(usuario).then((res)=>{
            console.log(res);
=======
      this.loginService.validateUsuario(usuario).then(([nome,senha])=>{
        const isUsuario = (nome.size > 0 || senha.size > 0)
        if(!isUsuario){
          this.usuarioService.postUsuario(usuario).then((res)=>{
>>>>>>> fb6230853c07904e51e06a4c0a27b743af625cbc
              if(res.id){
                this.alert.openSnackBar('Usuario Cadastrado !', '', 'success');
                this.cardLogin();
              }else{
                this.alert.openSnackBar('Falha ao Cadastrar !', '', 'danger');
              }
          })
        }else{
          this.alert.openSnackBar('Email ou Senha já existentes !', '', 'warning');
        }
      })
    }
  }
  cardLogin(){
    this.hideCardCadastro = true;
    this.hideCardLogin= false;
    this.userLoginForm.reset();
  }
  cardCadastro(){
    this.hideCardCadastro = false;
    this.hideCardLogin= true;
    this.userCadastroForm.reset();
  }
  
}
