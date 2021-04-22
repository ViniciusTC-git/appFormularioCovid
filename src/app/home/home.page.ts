import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Usuario, Setor } from '../../models/Usuario';
import {UsuarioService} from '../../services/usuario.service';
import { Formulario, Sintoma } from '../../models/Formulario';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validator } from '../../models/Validator';
import { FormularioService } from '../../services/formulario.service';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/services/spinner.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild(MatAccordion) accordion: MatAccordion;

  isSubmitToday: boolean = null;
  hideForm: boolean = false;
  dateToday: string = new Date().toLocaleDateString();
  usuario: Usuario = new Usuario(null);
  formularioForm: FormGroup;
  validationMessage: Validator;
  sintomas: Array<Sintoma> = [];

  constructor(
    private usuarioService: UsuarioService,
    private formularioService: FormularioService,
    private auth: AuthService,
    private form: FormBuilder,
    private spinner: SpinnerService,
    private alert: AlertService,
  ) {
    
    this.formularioForm = this.form.group({
      febre: false,
      tosse: false,
      cansaco: false,
      dores: false,
      dorDeGarganta: false,
      conjuntivite: false,
      dorDeCabeca: false,
      dificuldadeRespiratoria: false,
      outro: ['', Validators.pattern(/^[a-zA-Z\s]*$/)],
      idUsuario: null
    })

    this.sintomas = Object.keys(this.formularioForm.value)
      .map((key) => new Sintoma(key))
      .filter((sintoma) => Object.keys(sintoma).length !== 0)
    this.validationMessage = new Validator();
  }

  ngOnInit() {
    this.auth.hasUser.subscribe(e => !e || this.getUsuario(e))
  }

  private async getUsuario(id: string) {
    this.spinner.open();

    const { docs } = await this.usuarioService.getUsuario(id)

    Object.assign(this.usuario, docs[0].data());

    this.formularioForm.get('idUsuario').setValue(docs[0].id);

    this.formularioService
      .getFormsByUser(docs[0].id)
      .subscribe((formularios) => {
        this.usuario.formularios = formularios.map((formulario) => new Formulario(formulario.payload.doc.data()));

        this.hasSubmit();
        this.spinner.hide();
    });
  }

  private hasSubmit() {
    if (!this.usuario.formularios || !this.usuario.formularios.length) return

    const dateToString = (data: any) => data ? new Date(data).toLocaleDateString(): new Date().toLocaleDateString();

    const todayDate = dateToString(null)

    this.isSubmitToday = this.usuario.formularios.some((formulario)=> dateToString(formulario.data)=== todayDate);
  }

  onSubmit() {
    this.spinner.open();

    const formulario = new Formulario(this.formularioForm.value);

    this.usuario.formularios.push(formulario);

    this.formularioService
      .postForm(formulario)
      .then(() => this.alert.open('Sucesso ao salvar Formulario !', 'success',3000))
      .catch(({ message }) => this.alert.open(message, 'danger', 3000))
      .finally(() => this.spinner.hide());
  }     

}
