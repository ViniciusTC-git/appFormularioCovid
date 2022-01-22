import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/Usuario';
import { UsuarioService } from 'src/services/usuario.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService
      .getUsuarios()
      .pipe(map(usuarios => usuarios.map(usuario => new Usuario(usuario.payload.doc.data()))))
      .subscribe(usuarios => this.usuarios = usuarios)
  }

}
