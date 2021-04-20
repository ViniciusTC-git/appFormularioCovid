import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/services/alert.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.page.html',
  styleUrls: ['./verificar-email.page.scss'],
})
export class VerificarEmailPage implements OnInit {

  error: any = {
    'auth/too-many-requests': 'Varias tentativas de reenvio de email, Tente mais tarde !'
  }
  constructor(
    private loginSrv: LoginService,
    private alert: AlertService
  ) { }

  ngOnInit() {}

  async onVerificarEmail() {
    this.loginSrv
      .verificarEmail()
      .then(() => this.alert.open('Sucesso ao reenviar Email !', 'success', 3000))
      .catch(({ code }) => this.alert.open(this.error[code], 'danger', 3000));
  }

}
