import { Component, OnInit, ElementRef } from '@angular/core';
import { UsuarioService } from 'src/services/usuario.service';
import { FormularioService } from 'src/services/formulario.service';
import { Usuario } from 'src/models/Usuario';
import { Formulario, Sintoma } from 'src/models/Formulario';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  usuarios: Array<Usuario> = new Array();
  sintomas: Array<Sintoma> = [];

  constructor( 
    private usuarioService:UsuarioService,
    private formularioService:FormularioService,
    private elRef: ElementRef
  ) { 
    this.sintomas = Object.keys(new Formulario(null)).map((key)=>{
      return new Sintoma(key);
    }).filter((sintoma)=>{
      return Object.keys(sintoma).length !== 0;
    })
  }

  ngOnInit() {
    const usuariosRequest =  this.usuarioService.getUsuarios();
    usuariosRequest.subscribe((dataUsers)=>{
      this.usuarios = dataUsers.map((dataUser) =>{
        const usuario = Object.assign(new Usuario(null),dataUser.payload.doc.data());
        usuario.id = dataUser.payload.doc.id
        const formulariosRequest = this.formularioService.getFormsByUser(usuario.id);
        formulariosRequest.subscribe((dataForms)=>{
          usuario.formularios = dataForms.map((dataForm)=>{
            return Object.assign(new Formulario(null),dataForm.payload.doc.data());
          })
        })
        return usuario;
      });
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.checkItems();
    }, 1000);
  }
  checkItems(){
    const panels = this.elRef.nativeElement.querySelectorAll('.panel');
    panels.forEach((panel)=> {
        const lists = panel.querySelectorAll('mat-list');
        lists.forEach((list) =>{
          const itemLength = list.querySelectorAll('mat-list-item').length;
          if(itemLength){
            panel.classList.add("danger")
          }
        });
    });
  }

}
