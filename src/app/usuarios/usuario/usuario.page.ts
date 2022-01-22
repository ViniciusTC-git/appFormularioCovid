import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Setor, Usuario } from 'src/models/Usuario';
import { AlertService } from 'src/services/alert.service';
import { AuthService } from 'src/services/auth.service';
import { SpinnerService } from 'src/services/spinner.service';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  userForm: FormGroup;
  id: string = null;
  setores: Setor;
  
  constructor(
    private router: ActivatedRoute,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private alert: AlertService,
    private spinner: SpinnerService
  ) { 
    this.createForm();
    this.setores =  new Setor();
  }

  ngOnInit() {
    this.router.params.subscribe(({ id }) => !id || this.getUsuario(id))
  }

  createForm() {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      ativo: [true, Validators.required],
      deletado: [false, Validators.required],
      criado: [Date, Validators.required],
      atualizado: [null],
      nome: ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.minLength(5),
        Validators.maxLength(30)
      ])],
      setor: ['',Validators.required],
      isRoot: [false, Validators.required]
    })
  }

  getUsuario(id: string) {
    this.spinner.open()
    this.usuarioService
      .getUsuario(id)
      .then(usuario => {
        this.userForm.patchValue(new Usuario(usuario.docs[0].data()))
        this.id = usuario.docs[0].id
      })
      .catch(() => this.alert.open('Falha ao buscar Usuario !', 'danger', 3000))
      .finally(() => this.spinner.hide())
  }

  onSave() {
    this.spinner.open();
    this.userForm.get('atualizado').setValue(new Date())
    this.usuarioService
      .putUsuario(new Usuario(this.userForm.value), this.id)
      .then(() => this.alert.open('Sucesso ao Atualizar Usuario !', 'success', 3000))
      .catch(() => this.alert.open('Falha ao atualizar Usuario !', 'danger', 3000))
      .finally(() => this.spinner.hide())
  }

}
