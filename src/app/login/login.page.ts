import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Setor, Usuario } from '../../models/Usuario'
import { LoginService } from '../../services/login.service'
import { AlertService } from '../../services/alert.service';
import { Validator } from '../../models/Validator';
import { SheetService } from 'src/services/sheet.service';
import { UsuarioService } from 'src/services/usuario.service';
import { SpinnerService } from 'src/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userLoginForm: FormGroup;
  userCadastroForm: FormGroup;
  userResetPasswordForm: FormGroup;

  hidePassword: boolean  = true;
  hidePasswordConfirm: boolean = true;

  validationMessage: Validator;
  setores: Setor;

  hideCard: any = {
    login: false,
    cadastro: true,
    redefinir: true
  }

  error: any = {
    'auth/user-not-found': 'Email não encontrado !',
    'auth/wrong-password': 'Senha Invalida !',
    'auth/too-many-requests': 'Por segurança está conta foi bloqueada devido a muitas tentativas de Login, por favor altere sua senha !',
    'auth/invalid-email': 'Email Invalido !'
  }
  sheetHandler: any = {
    'add':() => this.onChangeCard('cadastro'),
    'password': () => this.onChangeCard('redefinir')
  }
  
  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private form: FormBuilder,
    private alert: AlertService,
    private sheet: SheetService,
    private spinner: SpinnerService
  ) { 
    this.userResetPasswordForm = this.form.group({
      email: ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^\S+@\S+\.\S+$/),
      ])],
    })
    this.userLoginForm = this.form.group({
      email: ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^\S+@\S+\.\S+$/),
      ])],
      senha: ['',Validators.required]
    })

    this.userCadastroForm = this.form.group({
      email: ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^\S+@\S+\.\S+$/),
      ])],
      senha: ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/),
      ])],
      confirmSenha: ['',Validators.required],
      nome: ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.minLength(5),
        Validators.maxLength(30)
      ])],
      setor: ['',Validators.required]
    })

    this.validationMessage = new Validator();
    this.setores =  new Setor();
  }

  ngOnInit() {}

  async onLogin() {
    if (!this.userLoginForm.valid) return;

    this.spinner.open();

    this.loginService
      .login(this.userLoginForm.value)
      .catch(({ code }) => this.alert.open(this.error[code], 'danger', 6000))
      .finally(() => this.spinner.hide())
  }

  async onOptions() {
    this.sheet.open([
      { icon: 'person_add', text: 'Não possui cadastro ?', role: 'add' },
      { icon: 'live_help', text: 'Esqueceu a senha ?', role: 'password' }
    ]).afterDismissed().subscribe(option => !option || this.sheetHandler[option]());
  }
  
  async onCadastro() {
    const { email, nome, setor, senha, confirmSenha } = this.userCadastroForm.value

    if (senha !== confirmSenha) {
      this.alert.open('Senhas não conferem !', 'warning', 3000);
      return;
    }

    this.loginService
      .cadastro({ email: email, senha: senha })
      .then((e) => {
        if (e) {
          this.loginService.verificarEmail();
          this.alert.open('Sucesso ao Cadastrar Usuario !', 'success', 3000)

          const usuario = new Usuario({ nome: nome, setor: setor })

          usuario.id = e.user.uid;

          this.usuarioService.postUsuario(usuario);
        } else {
          this.alert.open('Falha ao Cadastrar Usuario !', 'warning', 3000)
        }
      })
      .catch(({ code }) => this.alert.open(this.error[code], 'danger', 3000))
  }

  async onResetSenha() {
    const email = this.userResetPasswordForm.get('email').value;

    this.loginService
      .resetSenha(email)
      .then(() => this.alert.open('Sucesso ao enviar Email !', 'success', 3000))
      .catch(({ message }) => this.alert.open(message, 'danger', 3000) )
  }

  onChangeCard(card: string) {
    this.hideCard[card] = false;

    Object.keys(this.hideCard).forEach((key) => (key === card || (this.hideCard[key] = true)))

    this.userLoginForm.reset();
    this.userCadastroForm.reset();
    this.userResetPasswordForm.reset();
  }
  
}
