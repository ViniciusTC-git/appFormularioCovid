import { Component, OnInit, ElementRef } from '@angular/core';
import { UsuarioService } from 'src/services/usuario.service';
import { FormularioService } from 'src/services/formulario.service';
import { Usuario } from 'src/models/Usuario';
import { Formulario, Sintoma } from 'src/models/Formulario';
import { hasSintoma } from 'src/utils/Formulario';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  usuarios: Array<Usuario> = new Array();
  sintomas: Array<Sintoma> = [];

  hasSintoma = hasSintoma;
  
  constructor( 
    private usuarioService: UsuarioService,
    private formularioService: FormularioService
  ) { 
    this.sintomas = Object
      .keys(new Formulario(null))
      .map((key) => new Sintoma(key))
      .filter((sintoma) => Object.keys(sintoma).length !== 0)
  }

  ngOnInit() {
    this.usuarioService
      .getUsuarios()
      .subscribe((usuarios) => {
        const usuariosPayload = usuarios
          .map(usuario => ({ 
            id: usuario.payload.doc.id,
            usuario: new Usuario(usuario.payload.doc.data())
          }))
          .filter(({ usuario }) => usuario.ativo && !usuario.deletado)

        this.usuarios = usuariosPayload.map(({ usuario }) => usuario);  

        usuariosPayload.forEach(({ id, usuario }) => {
          this.formularioService
            .getFormsByUser(id)
            .subscribe((formularios) => {
              usuario.formularios = formularios.map((formulario) => {
                return new Formulario(formulario.payload.doc.data());
              })
            })
        })  
      })
  }

}
